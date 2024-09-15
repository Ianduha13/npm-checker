"use client"
import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";
import { cn } from "@/lib/utils";
import NumberTicker from "./magicui/number-ticker";

interface GitHubStarsProps {
  repoUrl: string;
  repoName: string;
}

export function GitHubStars({ repoUrl, repoName }: GitHubStarsProps) {
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    async function fetchGitHubStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`, {  next: { revalidate: 3600, },});
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count || 0);
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }

    fetchGitHubStars();
  }, [repoName]);

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants(),
        "max-w-52 gap-2 overflow-hidden whitespace-pre flex justify-center items-center rounded-md px-4 py-2 transition-all duration-300"
      )}
    >
      <div className="flex items-center">
        <FaGithub className="size-4" />
        <span className="ml-2">Star on GitHub</span>
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm">
        <Star className="size-4 text-yellow-300" fill="#fde047" />
         <NumberTicker value={stars} className="font-display font-medium text-white dark:text-black" />
      </div>
    </Link>
  );
}
