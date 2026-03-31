import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "HkSolDev";

interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
  count: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = parseInt(
    searchParams.get("year") ?? String(new Date().getFullYear()),
    10
  );

  const from = `${year}-01-01`;
  const to   = `${year}-12-31`;

  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${from}&to=${to}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "X-Requested-With": "XMLHttpRequest",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub returned ${res.status}` },
        { status: res.status }
      );
    }

    const html = await res.text();

    // Parse <td> elements: <td data-date="2026-01-04" data-level="1" ...>
    const tdRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;
    const contributions: ContributionDay[] = [];
    let match: RegExpExecArray | null;

    while ((match = tdRegex.exec(html)) !== null) {
      contributions.push({
        date:  match[1],
        level: parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4,
        count: 0, // GitHub no longer puts count in the td directly
      });
    }

    // Fallback: try alternate attribute order  data-level first
    if (contributions.length === 0) {
      const altRegex = /data-level="([0-4])"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
      while ((match = altRegex.exec(html)) !== null) {
        contributions.push({
          date:  match[2],
          level: parseInt(match[1], 10) as 0 | 1 | 2 | 3 | 4,
          count: 0,
        });
      }
    }

    // Count total non-zero days as a rough proxy
    const totalMatch = html.match(/(\d[\d,]*)\s+contribution/);
    const total = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
      : contributions.filter((d) => d.level > 0).length;

    return NextResponse.json(
      {
        total:         { [year]: total },
        contributions: contributions.sort((a, b) => a.date.localeCompare(b.date)),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("GitHub contributions error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
