"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Slide } from "@/types/presentation";

interface Props {
  slide: Slide;
  isQuizRevealed?: boolean;
}

function getCorrectIndex(slide: Slide): number | undefined {
  const raw = slide.correct ?? (slide as Record<string, unknown>).correctAnswer;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const n = parseInt(raw, 10);
    return Number.isNaN(n) ? undefined : n;
  }
  return undefined;
}

function optionText(opt: unknown): string {
  if (typeof opt === "string") return opt;
  if (opt && typeof opt === "object" && "text" in opt) {
    return String((opt as { text: unknown }).text);
  }
  return String(opt);
}

export function QuizSlide({ slide, isQuizRevealed = false }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const options = (slide.options ?? []) as unknown[];
  const correctIndex = getCorrectIndex(slide);
  const question = slide.question ?? slide.title ?? "Question";
  const explanation = slide.explanation;
  const revealed = picked !== null || isQuizRevealed;

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-6 py-8 md:px-10 md:py-12">
      <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-bude-purple">
        <span className="inline-flex h-2 w-2 rounded-full bg-bude-purple animate-pulse" />
        {slide.topic ? `Topic: ${slide.topic}` : "Pop quiz"}
      </div>
      <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
        {question}
      </h2>

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2 md:gap-4">
        {options.map((opt, i) => {
          const isPicked = picked === i || (isQuizRevealed && i === correctIndex);
          const isCorrect = revealed && i === correctIndex;
          const isWrongPick = revealed && isPicked && i !== correctIndex;
          return (
            <motion.button
              key={i}
              type="button"
              whileHover={revealed ? undefined : { scale: 1.015 }}
              whileTap={revealed ? undefined : { scale: 0.985 }}
              onClick={() => !revealed && setPicked(i)}
              disabled={revealed}
              className={cn(
                "group flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all md:p-5",
                !revealed && "border-border bg-card/60 hover:border-foreground/30 hover:bg-card",
                isCorrect && "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20",
                isWrongPick && "border-rose-500 bg-rose-500/10",
                revealed && !isCorrect && !isWrongPick && "opacity-50",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-semibold text-sm",
                  !revealed && "bg-muted text-muted-foreground group-hover:bg-bude-purple/20 group-hover:text-bude-purple",
                  isCorrect && "bg-emerald-500 text-white",
                  isWrongPick && "bg-rose-500 text-white",
                  revealed && !isCorrect && !isWrongPick && "bg-muted text-muted-foreground",
                )}
              >
                {isCorrect ? (
                  <Check className="h-4 w-4" />
                ) : isWrongPick ? (
                  <X className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1 text-base font-medium leading-snug md:text-lg">
                {optionText(opt)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur md:p-5"
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-bude-primary">
            {picked === correctIndex ? "Correct" : "The answer"}
          </div>
          {explanation ? (
            <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
              {explanation}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Option {correctIndex !== undefined ? String.fromCharCode(65 + correctIndex) : "?"} is the one.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
