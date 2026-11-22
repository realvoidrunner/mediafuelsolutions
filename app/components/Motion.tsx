"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  All page motion lives here.
  Markup opts in with data attributes:
    [data-split]     heading whose words slide up when scrolled into view
    [data-reveal]    fades up when scrolled into view
    [data-stagger]   its direct children fade up one after another
    [data-float]     drifts with scroll (value = strength, negative = opposite way)
    [data-chat]      chat bubbles that appear in sequence
  Everything is skipped when the visitor prefers reduced motion.
*/
export default function Motion() {
  // Smooth scrolling
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: true, // landing offset comes from the CSS scroll-padding-top
      stopInertiaOnNavigate: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    try {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";

        // ---------- Hero intro: one orchestrated sequence ----------
        const intro = gsap.timeline({ delay: 0.15 });
        intro
          .fromTo(".hero-status", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease })
          .fromTo(
            ".hero-title .split-word-inner",
            { yPercent: 115, y: 0 }, // y: 0 clears the offset GSAP reads from the CSS starting state
            { yPercent: 0, duration: 1.2, ease, stagger: 0.07 },
            "-=0.6",
          )
          .fromTo(
            ".hero-copy > *",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, ease, stagger: 0.1 },
            "-=0.8",
          )
          .fromTo(".lead-demo-head", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease }, "-=0.7")
          .fromTo(".lead-feed", { "--line": 0 }, { "--line": 1, duration: 1.6, ease: "power2.inOut" }, "-=0.5")
          .fromTo(
            ".lead-event",
            { opacity: 0, y: 28, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)", stagger: 0.55 },
            "<",
          );

        // Hero content eases away as you scroll past it
        gsap.to(".hero-inner", {
          y: 90,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        // ---------- Headings: words slide up ----------
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".split-word-inner"),
            { yPercent: 115, y: 0 }, // y: 0 clears the offset GSAP reads from the CSS starting state
            {
              yPercent: 0,
              duration: 1.1,
              ease,
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        // ---------- Single elements fade up ----------
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        // ---------- Groups: children arrive one after another ----------
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.fromTo(
            group.children,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease,
              stagger: 0.12,
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            },
          );
        });

        // ---------- Chat bubbles in the follow-up card ----------
        const chat = document.querySelector(".mock-chat");
        if (chat) {
          gsap.fromTo(
            chat.querySelectorAll("[data-chat]"),
            { opacity: 0, y: 14, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.6)",
              stagger: 0.7,
              scrollTrigger: { trigger: chat, start: "top 80%", once: true },
            },
          );
        }

        // ---------- Floating details drift with scroll ----------
        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
          const strength = parseFloat(el.dataset.float || "0.5");
          gsap.fromTo(
            el,
            { y: 30 * strength },
            {
              y: -30 * strength,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // ---------- How we work: progress line fills as you scroll ----------
        const steps = document.querySelector(".steps");
        if (steps) {
          const items = gsap.utils.toArray<HTMLElement>(".steps > li");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: steps, start: "top 75%", end: "bottom 65%", scrub: 0.6 },
          });
          gsap.set(items, { "--p": 0 });
          gsap.set(items.slice(1).map((li) => li.querySelector(".step-num")), {
            backgroundColor: "#FFFFFF",
            color: "#0A5CFF",
          });
          items.forEach((li, i) => {
            if (i < items.length - 1) {
              tl.to(li, { "--p": 1, duration: 1, ease: "none" });
              tl.to(items[i + 1].querySelector(".step-num"), {
                backgroundColor: "#0A5CFF",
                color: "#FFFFFF",
                duration: 0.25,
              });
            }
          });
        }
      });
    } catch {
      // If anything goes wrong, show everything rather than leave it hidden
      document.documentElement.classList.add("motion-off");
    }
  });

  return null;
}
