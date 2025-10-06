import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How does the free trial work?",
      answer:
        "You get full access to all Professional plan features for 14 days. No credit card required to start, and you can cancel anytime during the trial period.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide email support for all plans, priority support for Professional plans, and dedicated 24/7 support for Enterprise customers. Our average response time is under 2 hours.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take security seriously. All data is encrypted in transit and at rest, we're SOC 2 compliant, and we undergo regular security audits. Your data is backed up daily across multiple regions.",
    },
    {
      question: "Do you offer custom integrations?",
      answer:
        "Professional plans include access to our extensive integration library. Enterprise customers can request custom integrations, and our team will work with you to build exactly what you need.",
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "We'll notify you before you reach your limits. You can either upgrade your plan or we'll work with you to find the best solution. We never cut off access without warning.",
    },
  ]

  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
