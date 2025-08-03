import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { question: "What is your return policy?", answer: "You can return within 30 days." },
  { question: "Do you ship internationally?", answer: "Yes, we ship worldwide." },
  { question: "How can I track my order?", answer: "You'll receive a tracking link via email." },
];

const TripFAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (ref) {
        if (openIndex === idx) {
          ref.style.maxHeight = ref.scrollHeight + "px";
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [openIndex]);

  return (
    <div className="flex-1/2 space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-surface border border-gray-200 shadow-md rounded-2xl transition duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center w-full px-6 py-3 text-left cursor-pointer"
            >
              <span className="text-base font-semibold text-gray-800 cursor-pointer">{faq.question}</span>
              {openIndex === i ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </button>
            <div
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="overflow-hidden cursor-pointer transition-all duration-300 max-h-0 px-6 text-gray-600 text-sm"
            >
              <div className="pb-4 cursor-pointer">{faq.answer}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TripFAQs
