import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Hemant Kumar",
  initials: "HK",
  url: "https://hemant-code1.vercel.app",
  location: "Remote, India",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "Self-taught Full-Stack & Solana Developer. Specializing in Rust, Anchor, React, and building resilient DeFi primitives.",
  summary:
    "Self-taught dev. Started with React and Node.js — shipped production apps across EVs, sports streaming, and tourism. Built a token launchpad on Solana and never looked back.\n\n" +
    "Now I go deep on Rust and on-chain engineering — Anchor contracts, AMM mechanics, DeFi primitives, and the React/Next.js frontends that make them usable. Focused on compute efficiency, PDA security, and building things that are hard to break.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "Anchor Framework" },
    { name: "SPL Tokens" },
    { name: "DeFi Protocols" },
    { name: "Rust" },
    { name: "TypeScript", icon: Typescript },
    { name: "JavaScript" },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Tailwind CSS", icon: Icons.tailwindcss },
    { name: "Shadcn UI" },
    { name: "Node.js", icon: Nodejs },
    { name: "Express" },
    { name: "FastAPI" },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MongoDB" },
    { name: "Redis" },
    { name: "Prisma" },
    { name: "Docker", icon: Docker },
    { name: "Git", icon: Icons.github },
    { name: "Amazon EC2" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "https://mrblackghost-how-ai-agent-work.hashnode.dev/",
      icon: NotebookIcon,
      label: "Blog",
    },
  ],
  contact: {
    email: "midnightmail@tutamail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/HkSolDev",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mrhemantkumarr/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Cal: {
        name: "Book a Meeting",
        url: "https://cal.com/hksoldev/quick-chat?user=hksoldev&overlayCalendar=true",
        icon: Icons.cal,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/HKsoldev",
        icon: Icons.x,
        navbar: true,
      },
      Telegram: {
        name: "Telegram",
        url: "https://t.me/MrBlackGhost",
        icon: Icons.telegram,
        navbar: true,
      },
      Discord: {
        name: "Discord",
        url: "https://discord.com/users/mrdevghost",
        icon: Icons.discord,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:midnightmail@tutamail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "autoconnect",
      href: "",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/auto-connect.jpg",
      start: "Dec 2024",
      end: "Sep 2025",
      description:
        "Developed the frontend for autoconnect, including secure user authentication and a dedicated page for generating electric vehicle data reports (battery status, health metrics). Integrated real-time vehicle data from external car connect services. Built using Next.js and Shadcn UI.",
    },
    {
      company: "Calara Barcelona",
      href: "https://clarabarcelo.us/",
      badges: [],
      location: "Remote",
      title: "Freelance Developer",
      logoUrl:
        "https://d3k81ch9hvuctc.cloudfront.net/company/RvHhne/images/9c15677e-8ea4-41a4-a5f1-37074f60553d.png",
      start: "Oct 2025",
      end: "Nov 2025",
      description:
        "Developed an Instagram engagement bot using Puppeteer with targeted user actions (liking, commenting, following, DMs). Implemented a comprehensive dashboard for viewing logs, tracking targeted users, monitoring message delivery, and error handling.",
    },
    {
      company: "Disporty LTD",
      href: "https://disporty.com/en",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/disporty-logo.webp",
      start: "Jan 2024",
      end: "Sep 2024",
      description:
        "Engineered optimized UI using React, Next.js, and Tailwind CSS. Boosted performance by migrating 60% of client-side components to SSR. Secured authentication with NextAuth.js and developed backend functionalities using Node.js and FastAPI. Replaced Material UI with Shadcn UI for consistency and improved styling.",
    },
    {
      company: "Delhi By Cycle",
      href: "https://www.delhibycycle.com/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl:
        "https://dbcpictures.s3.ap-south-1.amazonaws.com/logo+and+graphics/transparent+logo+DBC.webp",
      start: "Mar 2023",
      end: "Dec 2023",
      description:
        "Built responsive, high-performance user interfaces using React, Redux Toolkit, Tailwind CSS, and Material-UI. Spearheaded UI enhancements that significantly improved user experience. Engineered pixel-perfect, customizable themes using React hooks, Redux, and styled components.",
    },
  ],
  education: [
    {
      school: "Delhi Technological University",
      href: "http://dtu.ac.in",
      degree: "B.Tech in Mechanical Engineering",
      logoUrl: "/DTU.jpg",
      start: "2018",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "SolBet - Prediction Market",
      href: "https://solbet.hemantdev.com/",
      dates: "",
      active: true,
      image: "/solbet.jpg",
      description:
        "A decentralized prediction market on Solana allowing users to bet on future events. Built with Anchor and Rust, featuring secure escrow handling and outcome resolution.",
      technologies: ["Solana", "Rust", "Anchor", "Next.js"],
      links: [
        {
          type: "Website",
          href: "https://solbet.hemantdev.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/predection_market",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
    {
      title: "Pool Fun",
      href: "https://pool.fun.hemantdev.com/",
      dates: "",
      active: true,
      image: "/pool-fun.jpg",
      description:
        "A bonding curve token launchpad on Solana inspired by Pump.fun. Implements automated market maker mechanics and dynamic pricing curves for fair token launches.",
      technologies: ["Solana", "Rust", "Anchor", "Next.js"],
      links: [
        {
          type: "Website",
          href: "https://pool.fun.hemantdev.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/pool-fun",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
    {
      title: "LimitDex",
      href: "https://orderbook.hemantdev.com/",
      dates: "",
      active: true,
      image: "/limitDex.jpg",
      description:
        "A high-performance central limit order book (CLOB) implementation on Solana. Features limit order placement, matching engine logic, and real-time order tracking.",
      technologies: ["Solana", "Rust", "Anchor", "Next.js"],
      links: [
        {
          type: "Website",
          href: "https://orderbook.hemantdev.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/orderBook",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
    {
      title: "SolPay",
      href: "https://solpay.hemantdev.com",
      dates: "Feb 2026",
      active: true,
      image: "/solpay.jpg",
      description:
        "A seamless crypto payment dashboard on Solana. Features unified token transfers (SOL & SPL), real-time contact syncing, and secure wallet authentication via Privy.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Solana",
        "Privy",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://solpay.hemantdev.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/Solpay",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
    {
      title: "LazorKit Wallet",
      href: "https://lazorkit-wallet.hemantdev.com/",
      dates: "",
      active: true,
      image: "/Lazorkit.jpg",
      description:
        "A modern Solana wallet adapter and UI kit designed for seamless dApp integration. Provides a customizable and lightweight interface for connecting Solana wallets.",
      technologies: ["Solana", "Wallet Adapter", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://lazorkit-wallet.hemantdev.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/kit",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
    {
      title: "NextTube - YouTube Clone",
      href: "https://nexttube.hemantdev.com",
      dates: "",
      active: true,
      image: "/nextTube.jpg",
      description:
        "Built using Next.js for server-side rendering and optimized performance. Implemented robust search feature and utilized YouTube API to fetch real-time video data. Fully responsive across all devices.",
      technologies: ["Next.js", "NextAuth.js", "YouTube API"],
      links: [
        {
          type: "Website",
          href: "https://nexttube.hemantdev.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/MrBlackGhostt/nextTube",
          icon: <Icons.github className="size-3" />,
        },
      ],
      video: "",
    },
  ],
  hackathons: [],
} as const;
