import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQList = [
  {
    question: "How to join and become a partner?",
    answer: "Register for our platform. A manager will reach out to introduce themselves and go over the specifics with you. Once we come to an agreement, your account will be activated, allowing you to start working.",
    value: "item-1",
  },
  {
    question: "What types of traffic do we accept?",
    answer: "The leading traffic sources include PPC, Facebook, Email, Push notifications, and Websites. Geographic coverage: Worldwide.",
    value: "item-2",
  },
  {
    question: "What payment systems do we use?",
    answer: "We can process payments via Payoneer, BTC, USDT (TRC20), and Wire transfer.",
    value: "item-3",
  },
  {
    question: "What is the payment frequency and minimum payout amount?",
    answer: "Payment Frequency: Initially net 30, then net 15. Minimum payout amount is $100.",
    value: "item-4",
  },
  {
    question: "How can I track traffic, conversion rate, and revenue?",
    answer: "We use the Offers18 tracking system. After registering and speaking with a manager, you will gain access to your Personal Account, where all the necessary information will be available.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#contact-us"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
