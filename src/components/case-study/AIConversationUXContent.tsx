"use client";

import { Eye, Compass, Brain } from "lucide-react";
import {
  Section,
  SubHeading,
  P,
  Bullets,
  Quote,
  Callout,
  StatRow,
  ImagePlaceholder,
  ClosingStatement,
  FrictionGroup,
  MatrixTable,
  MatrixRow,
} from "./ResearchPrimitives";
import { useResearchAccent } from "./ResearchAccent";

export const AI_CONVERSATION_UX_TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "objective", label: "Objective" },
  { id: "product-observations", label: "Product Observations" },
  { id: "experience-audit", label: "Experience Audit" },
  { id: "key-findings", label: "Key Findings" },
  { id: "opportunity-matrix", label: "Opportunity Matrix" },
  { id: "design-principles", label: "Design Principles" },
  { id: "final-thoughts", label: "Final Thoughts" },
];

const PRODUCTS = [
  { name: "ChatGPT", philosophy: "Collaborative thinking partner", bestFor: "Brainstorming, writing, iterative problem solving" },
  { name: "Claude", philosophy: "Thoughtful research collaborator", bestFor: "Long-form writing, analysis, nuanced reasoning" },
  { name: "Gemini", philosophy: "Productivity assistant", bestFor: "Google Workspace integration, multimodal workflows" },
  { name: "Perplexity", philosophy: "Research-first answer engine", bestFor: "Fact verification and citation-backed search" },
];

const OPPORTUNITIES: MatrixRow[] = [
  { num: 1, title: "Confidence indicators", description: "Visually distinguish verified facts from probabilistic or generated reasoning, so users can calibrate trust per-response rather than per-product.", impact: "High", effort: "Medium", priority: "High" },
  { num: 2, title: "Source reliability labels", description: "Surface lightweight signals on citation quality — not just that a source exists, but how strong it is.", impact: "High", effort: "Low", priority: "High" },
  { num: 3, title: "Memory timeline", description: "Give users a visible, editable record of what's being remembered and why it's shaping the current response.", impact: "High", effort: "Medium", priority: "High" },
  { num: 4, title: "Conversation map", description: "Let users see and navigate how a long conversation has branched, rather than scrolling linearly to reconstruct context.", impact: "Medium", effort: "Medium", priority: "Medium" },
  { num: 5, title: "Explain response reasoning", description: "Offer an optional, lightweight explanation of what informed an answer — without turning every response into a research paper.", impact: "High", effort: "High", priority: "Medium" },
];

const PRINCIPLES = [
  "Design uncertainty instead of hiding it.",
  "Show evidence before confidence.",
  "Make memory visible and user-controlled.",
  "Separate facts from generated reasoning.",
  "Encourage collaborative refinement over one-shot answers.",
  "Support recovery instead of assuming perfection.",
  "Explain why an answer was generated.",
  "Design trust as a feature, not an outcome.",
];

const FINDINGS = [
  { icon: Eye, title: "Transparency builds confidence", body: "Users are more likely to trust systems that clearly explain where information originates." },
  { icon: Compass, title: "Conversation should encourage exploration", body: "The strongest experiences treated conversations as collaborative thinking sessions, not single-answer interactions." },
  { icon: Brain, title: "Visible system behavior reduces cognitive load", body: "Users make better decisions when they understand why a response was generated and what informed it." },
];

export default function AIConversationUXContent() {
  const accent = useResearchAccent();

  return (
    <div>
      {/* Overview stats */}
      <div className="pt-14 pb-4">
        <StatRow
          items={[
            { value: "4", label: "AI products compared" },
            { value: "5", label: "Opportunities mapped" },
            { value: "8", label: "Design principles" },
            { value: "3", label: "Friction tiers audited" },
          ]}
        />
      </div>

      {/* 01 — Introduction */}
      <Section id="introduction" label="01" title="Introduction">
        <div className="space-y-5">
          <P>
            The way people interact with software is changing. For decades, digital experiences relied on buttons,
            navigation menus, and search bars. Today, users increasingly interact with AI through natural language —
            expecting systems to understand intent, retain context, and offer meaningful guidance.
          </P>
          <P>
            That shift introduces a new kind of UX problem. Unlike traditional interfaces, conversational AI is
            expected to behave like a collaborator rather than a tool. Users aren&apos;t only judging whether an
            answer is correct — they&apos;re judging whether the interaction itself feels trustworthy, transparent,
            and reliable.
          </P>
          <P>
            Each assistant approaches this differently. Some prioritize creativity and collaboration, others emphasize
            citations, long-form reasoning, or ecosystem integration — and these differences shape how confident,
            credible, and in control a user feels throughout a conversation.
          </P>
          <P>
            This investigation looks at how four leading AI assistants — ChatGPT, Claude, Gemini, and Perplexity —
            design conversations, communicate uncertainty, and support user decision-making. Rather than comparing
            model performance, the study focuses on the interaction patterns that influence trust and overall
            experience.
          </P>
          <ImagePlaceholder label="Hero — all four AI assistants connected by a shared conversation network" />
        </div>
      </Section>

      {/* 02 — Objective */}
      <Section id="objective" label="02" title="Objective">
        <div className="space-y-5">
          <P>
            The purpose of this investigation was to understand how conversational interfaces influence user trust —
            beyond the quality of the generated response itself. The research centered on five questions:
          </P>
          <Bullets
            items={[
              "How do AI assistants establish credibility during a conversation?",
              "How is uncertainty communicated to users?",
              "What interaction patterns encourage continued exploration?",
              "How do products support verification through citations or references?",
              "Which design decisions improve long-term conversational experiences?",
            ]}
          />
          <P>
            Rather than evaluating intelligence or benchmark scores, the study examines how interaction design affects
            confidence, transparency, and user decision-making.
          </P>
        </div>
      </Section>

      {/* 03 — Product Observations */}
      <Section id="product-observations" label="03" title="Product Observations">
        <div className="space-y-16">
          <div className="space-y-5">
            <SubHeading>03.1 &nbsp;Understanding the AI Ecosystem</SubHeading>
            <P>
              Although conversational AI products often appear similar on the surface, each is built around a distinct
              product philosophy. Every interaction follows a comparable technical flow:
            </P>
            <Quote>User Prompt → Intent Interpretation → Context Retrieval → Response Generation → Conversation Continuation</Quote>
            <P>
              From a user&apos;s perspective, though, the experience extends well beyond response generation. Trust is
              built through the clarity of explanations, the visibility of sources, conversational memory, and a
              system&apos;s willingness to acknowledge its own limitations.
            </P>
            <P>
              In other words, conversational UX is no longer only about generating answers — it&apos;s about designing
              interactions that reduce uncertainty while maintaining user confidence.
            </P>
            <ImagePlaceholder label="Diagram — the AI ecosystem flow" />
          </div>

          <div className="space-y-5">
            <SubHeading>03.2 &nbsp;Comparing Product Philosophies</SubHeading>
            <P>Across the comparison, each assistant showed a noticeably different conversational personality.</P>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Product</th>
                    <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Primary Design Philosophy</th>
                    <th className="py-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">Best Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.name} className="border-b border-white/5 align-top">
                      <td className="py-4 pr-4 text-[15px] font-medium text-white whitespace-nowrap">{p.name}</td>
                      <td className="py-4 pr-4 text-[14px] text-zinc-400">{p.philosophy}</td>
                      <td className="py-4 text-[14px] text-zinc-400">{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              Rather than competing on the same strengths, these products optimize for different user expectations.
              ChatGPT encourages iterative collaboration, Claude prioritizes structured reasoning, Gemini integrates
              deeply into productivity workflows, and Perplexity leads with evidence-backed responses and visible
              citations.
            </P>
          </div>

          <div className="space-y-5">
            <SubHeading>03.3 &nbsp;Mapping the Conversation Journey</SubHeading>
            <P>Across all four products, the conversation follows a similar high-level journey:</P>
            <Quote>
              User Prompt → Intent Interpretation → Response Generation → Evidence &amp; References → Follow-up
              Suggestions → Conversation Continuation → Memory &amp; Personalization
            </Quote>
            <P>
              Although the flow looks consistent on paper, each product differs in how much visibility it gives at
              every stage. Some encourage iterative refinement through follow-up prompts, while others prioritize
              quick, citation-backed answers. Those choices significantly shape how trustworthy the conversation
              feels.
            </P>
            <ImagePlaceholder label="Diagram — horizontal conversation journey" />
          </div>

          <div className="space-y-4">
            <SubHeading>03.4 &nbsp;Personal Observation</SubHeading>
            <P>While exploring each assistant, one insight consistently emerged: trust was not created by accuracy alone.</P>
            <P>
              It was influenced by how transparently the system communicated uncertainty, referenced external
              information, and encouraged users to keep exploring rather than presenting every answer as definitive.
            </P>
            <Callout label="Personal observation">
              Products that openly acknowledged limitations and provided supporting evidence created stronger
              confidence than those that relied solely on fluent language.
            </Callout>
          </div>
        </div>
      </Section>

      {/* 04 — Experience Audit */}
      <Section id="experience-audit" label="04" title="Experience Audit">
        <div className="space-y-12">
          <FrictionGroup
            level="high"
            items={[
              {
                title: "Confidence often appears absolute",
                body: "AI assistants frequently present uncertain or probabilistic information with the same visual confidence as verified facts. Without visible confidence indicators, users struggle to distinguish established knowledge from generated reasoning.",
                impact: ["Increased risk of over-reliance", "Reduced ability to assess information quality", "Potential decision-making errors"],
              },
              {
                title: "Memory is often invisible",
                body: "As conversational systems get more personalized, users rarely get a clear explanation of what's being remembered, or why it's influencing future responses. Research on conversational memory shows that different memory strategies materially affect personalization quality, and that inappropriate memory use can reduce relevance or expose sensitive context.",
                impact: ["Reduced transparency", "Lower user control", "Increased privacy concerns"],
              },
              {
                title: "Evidence is inconsistent",
                body: "Some assistants consistently surface citations, while others prioritize conversational fluency over sourcing. That inconsistency forces users to independently verify information, particularly for factual or research-oriented tasks.",
                impact: ["Extra verification burden on the user", "Inconsistent trust signals across products", "Harder to use for research-critical tasks"],
              },
            ]}
          />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f59e0b" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#fbbf24" }}>Medium Friction</span>
            </div>
            <Bullets
              items={[
                "Context can degrade during very long conversations",
                "Branching conversations remain limited",
                "Multimodal workflows aren't always consistent across tasks",
                "System status during reasoning is often unclear",
              ]}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Low Friction</span>
            </div>
            <Bullets items={["Suggested follow-up prompts", "Markdown formatting", "File uploads", "Voice interaction", "Quick message editing"]} />
          </div>

          <ImagePlaceholder label="Board — High / Medium / Low friction" />
        </div>
      </Section>

      {/* 05 — Key Findings */}
      <Section id="key-findings" label="05" title="Key Findings">
        <div className="space-y-8">
          <P>The investigation surfaced three recurring themes.</P>
          <div className="grid md:grid-cols-3 gap-6">
            {FINDINGS.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-3 transition-transform duration-300 hover:-translate-y-1"
              >
                <f.icon size={20} style={{ color: accent }} />
                <p className="text-[15px] font-medium text-white leading-snug">{f.title}</p>
                <p className="text-[13.5px] text-zinc-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <ImagePlaceholder label="Trust Framework — Accuracy · Transparency · Evidence · Control · Memory" />
        </div>
      </Section>

      {/* 06 — Opportunity Matrix */}
      <Section id="opportunity-matrix" label="06" title="Opportunity Matrix">
        <div className="space-y-6">
          <MatrixTable rows={OPPORTUNITIES} headings={{ first: "Opportunity" }} />
          <P>These improvements focus less on increasing model capability and more on improving interaction transparency.</P>
        </div>
      </Section>

      {/* 07 — Design Principles */}
      <Section id="design-principles" label="07" title="Design Principles">
        <div className="space-y-6">
          <P>If I were designing the next generation of conversational AI, these principles would guide every interaction.</P>
          <div className="grid md:grid-cols-2 gap-4">
            {PRINCIPLES.map((principle, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.02] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] font-medium text-white leading-snug">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — Final Thoughts */}
      <Section id="final-thoughts" label="08" title="Final Thoughts">
        <div className="space-y-5">
          <P>
            The future of conversational AI won&apos;t be defined solely by larger models or faster responses. It will
            be defined by how effectively products help users understand, verify, and collaborate with AI.
          </P>
          <P>
            Across all four products, the strongest experiences weren&apos;t necessarily the ones that generated the
            most impressive answers — they were the ones that made users feel informed, in control, and confident
            throughout the conversation.
          </P>
          <ClosingStatement>
            As conversational interfaces continue to replace traditional search and navigation, transparency will
            become one of the most important responsibilities of product design. AI shouldn&apos;t only provide
            answers — it should help users understand why those answers deserve their trust.
          </ClosingStatement>
        </div>
      </Section>
    </div>
  );
}
