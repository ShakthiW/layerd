export interface ArticleBlock {
  type: "paragraph" | "heading" | "pullquote" | "image" | "divider";
  content?: string;
  src?: string;
  alt?: string;
}

export const articleBlocks: Record<string, ArticleBlock[]> = {
  "why-layerd-exists": [
    {
      type: "heading",
      content: "A garage, a dream, a single spool",
    },
    {
      type: "paragraph",
      content:
        "It started in a small garage in Colombo, with one 3D printer humming through the night. We weren't trying to build a brand — we were trying to answer a question that wouldn't leave us alone: why does nobody in Sri Lanka make beautiful, everyday objects using 3D printing?",
    },
    {
      type: "paragraph",
      content:
        "The technology had been around for decades, but it was trapped in engineering labs and prototyping workshops. Nobody was using it to create things people actually wanted to own — objects that felt premium, intentional, and worth keeping on your desk or shelf.",
    },
    {
      type: "image",
      src: "/images/stories/garage-workshop.png",
      alt: "A 3D printer humming in a dimly lit garage workshop, warm amber light from the nozzle illuminating layers being built",
    },
    {
      type: "pullquote",
      content:
        "Why does nobody in Sri Lanka make beautiful, everyday objects using 3D printing?",
    },
    {
      type: "heading",
      content: "Six months of beautiful failures",
    },
    {
      type: "paragraph",
      content:
        "We spent six months printing failures. Warped vases. Brittle phone stands. Models that looked perfect on screen and disastrous in real life. Each failure taught us something about materials, temperatures, layer heights, and the invisible physics of additive manufacturing.",
    },
    {
      type: "paragraph",
      content:
        "Then one day, a desk organizer came off the print bed and it was right. The layers caught the light in a way that felt deliberate. The weight was satisfying. The geometry was clean. We put it on a desk, stepped back, and realised — this is what we'd been looking for.",
    },
    {
      type: "image",
      src: "/images/stories/desk-organizer.png",
      alt: "A geometric 3D printed desk organizer catching golden hour light, holding pens and supplies",
    },
    { type: "divider" },
    {
      type: "heading",
      content: "Technology meets soul",
    },
    {
      type: "paragraph",
      content:
        "That's why Layerd exists. Not to sell 3D prints, but to prove that technology and craft aren't opposites. That a machine can produce something with soul. That every layer deposited with care is an act of creation, not just manufacturing.",
    },
    {
      type: "pullquote",
      content:
        "Every layer deposited with care is an act of creation, not just manufacturing.",
    },
    {
      type: "paragraph",
      content:
        "Today, every product we make carries that original spirit. We obsess over materials. We test relentlessly. We print slowly when we need to, because the surface finish matters more than the deadline. And we believe that Sri Lanka can build brands that compete on the world stage — not on price, but on design, intention, and story.",
    },
  ],

  "how-a-lamp-is-built-layer-by-layer": [
    {
      type: "heading",
      content: "It begins with a sketch",
    },
    {
      type: "paragraph",
      content:
        "Our signature desk lamp starts as a sketch — rough lines on a tablet, capturing the curve of light and shadow we want to achieve. The first version never survives contact with physics.",
    },
    {
      type: "paragraph",
      content:
        "The design moves into CAD software where we model every millimetre. Wall thickness, structural integrity, light diffusion angles — each parameter affects the final product. We typically go through 8 to 12 iterations before a design is print-ready.",
    },
    {
      type: "image",
      src: "/images/stories/design-sketches.png",
      alt: "Industrial design sketches and a small 3D printed prototype on a dark desk under warm amber light",
    },
    {
      type: "heading",
      content: "3,200 layers of precision",
    },
    {
      type: "paragraph",
      content:
        "Slicing is where the magic happens. The 3D model is divided into thousands of horizontal layers — our desk lamp needs approximately 3,200 layers at 0.12mm height. The slicer generates a path for the print head that will take 14 hours to complete.",
    },
    {
      type: "pullquote",
      content: "Each layer is only slightly thicker than a human hair.",
    },
    {
      type: "paragraph",
      content:
        "The print runs overnight. Temperature stability is crucial — a 2-degree fluctuation can cause layer separation. We monitor remotely, watching the time-lapse build up layer by layer, each one only slightly thicker than a human hair.",
    },
    {
      type: "image",
      src: "/images/stories/lamp-layers.png",
      alt: "Close-up macro shot of 3D printed layers on a geometric lamp, warm gold light catching the fine layer lines",
    },
    { type: "divider" },
    {
      type: "heading",
      content: "The art of finishing",
    },
    {
      type: "paragraph",
      content:
        "Post-processing takes almost as long as the print itself. Removing support structures, sanding contact points, testing the electrical components, and applying the final finish. Every lamp is inspected under magnification before it earns the Layerd mark.",
    },
    {
      type: "paragraph",
      content:
        "The result is an object that couldn't exist without 3D printing — geometries that are impossible to mould, surfaces that play with light in ways that feel organic despite being mathematically precise. That's the beauty of building layer by layer.",
    },
  ],

  "from-idea-to-object": [
    {
      type: "heading",
      content: "Spotting the gap",
    },
    {
      type: "paragraph",
      content:
        "Every Layerd product begins the same way: someone on the team notices a gap. A frustration. A moment where they think, 'this should exist, and it should be beautiful.'",
    },
    {
      type: "paragraph",
      content:
        "We keep a running list of ideas — some practical, some purely artistic. During our weekly design reviews, we pick one and spend an hour sketching possibilities. No screens yet. Just paper, markers, and debate.",
    },
    {
      type: "pullquote",
      content: "This should exist, and it should be beautiful.",
    },
    {
      type: "image",
      src: "/images/stories/design-sketches.png",
      alt: "Design sketches and prototypes on a dark desk under warm lighting",
    },
    {
      type: "heading",
      content: "From digital to physical",
    },
    {
      type: "paragraph",
      content:
        "The winning concepts move to digital prototyping. We use parametric design tools that let us adjust dimensions fluidly — changing a single parameter can reshape the entire object. This is where 3D printing shines: there are no tooling costs, so we can experiment freely.",
    },
    {
      type: "paragraph",
      content:
        "Physical prototyping is where most ideas break. An object that looks perfect on screen might feel wrong in your hand. Too light. Too sharp at the edges. We print test pieces in draft quality — fast, rough prints that tell us whether the form factor works before we invest in a final print.",
    },
    { type: "divider" },
    {
      type: "heading",
      content: "Living with the prototype",
    },
    {
      type: "paragraph",
      content:
        "The jump from prototype to product involves material selection, finish testing, and packaging design. We test each product in real conditions for at least two weeks before launch. Does the pen holder actually hold pens well? Does the coaster feel premium when you set down a glass?",
    },
    {
      type: "image",
      src: "/images/stories/desk-organizer.png",
      alt: "A beautifully finished 3D printed desk organizer in use, catching warm light",
    },
    {
      type: "paragraph",
      content:
        "By the time a product reaches you, it's been through dozens of iterations, hundreds of hours of testing, and thousands of layers of refinement. That's what 'from idea to object' really means.",
    },
  ],

  "print-failures-and-lessons": [
    {
      type: "heading",
      content: "The elephant in the room",
    },
    {
      type: "paragraph",
      content:
        "Let's talk about the elephant in the room: 3D printing fails. A lot. And when it fails, it fails spectacularly — spaghetti-like tangles of filament, delaminated layers, and objects that look like they melted in the sun.",
    },
    {
      type: "image",
      src: "/images/stories/failed-prints.png",
      alt: "A collection of failed 3D prints — spaghetti filament, warped objects, and cracked prints on a dark workbench",
    },
    {
      type: "heading",
      content: "The planter catastrophe",
    },
    {
      type: "paragraph",
      content:
        "Our first major production failure was a batch of geometric planters. We'd tested the design five times successfully, but when we scaled to 20 pieces for a launch, overnight temperature drops caused 14 of them to crack. Lost three days of print time and a lot of filament.",
    },
    {
      type: "pullquote",
      content: "Failure isn't the opposite of quality — it's the path to it.",
    },
    {
      type: "paragraph",
      content:
        "That failure taught us about environmental control. We now monitor ambient temperature and humidity continuously. Our print room maintains a stable 24°C ± 1°, and we track conditions for every single print run.",
    },
    { type: "divider" },
    {
      type: "heading",
      content: "The failure log",
    },
    {
      type: "paragraph",
      content:
        "Another memorable failure: a custom chess set where the knight's head kept breaking off during support removal. The geometry was too delicate for FDM printing at that scale. We redesigned the model three times before finding a version where the support structures didn't compromise the detail.",
    },
    {
      type: "paragraph",
      content:
        "We've learned that failure isn't the opposite of quality — it's the path to it. Every failed print teaches us something about materials science, mechanical engineering, and the limits of our technology. We now keep a 'failure log' that documents every significant failure and the lesson it taught us.",
    },
    {
      type: "paragraph",
      content:
        "The products you see in our shop have survived this gauntlet. They work because dozens of earlier versions didn't. And we wouldn't have it any other way.",
    },
  ],

  "your-first-10-products-journey": [
    {
      type: "heading",
      content: "The terror of shipping",
    },
    {
      type: "paragraph",
      content:
        "When we shipped our first 10 orders, we were terrified. Would the packaging survive transit? Would the products match expectations? Would anyone actually care about what we'd built?",
    },
    {
      type: "image",
      src: "/images/stories/unboxing-moment.png",
      alt: "Hands unboxing a premium 3D printed desk object from elegant dark packaging with tissue paper",
    },
    {
      type: "heading",
      content: "Customer #1",
    },
    {
      type: "paragraph",
      content:
        "Customer #1 was a designer in Kandy who ordered a minimal desk organizer. She messaged us a photo of it on her desk, in golden afternoon light, with the caption: 'This is exactly what I didn't know I needed.' We printed that message and pinned it to our workshop wall.",
    },
    {
      type: "pullquote",
      content: "This is exactly what I didn't know I needed.",
    },
    {
      type: "heading",
      content: "The most valuable return",
    },
    {
      type: "paragraph",
      content:
        "Customer #4 returned his order. The surface finish on one side had visible layer lines that didn't match the product photos. He was right. It was a quality control gap that we'd missed. We refunded immediately, reprinted at a finer layer height, and shipped a replacement with a handwritten apology.",
    },
    {
      type: "paragraph",
      content:
        "That return was the most valuable feedback we've ever received. It led us to implement a multi-stage QC process: visual inspection, dimensional checks, surface finish grading, and a 'desk test' where we place every product in a real environment before shipping.",
    },
    { type: "divider" },
    {
      type: "heading",
      content: "Every order is the first",
    },
    {
      type: "paragraph",
      content:
        "By customer #10, we had learned more about running a product business than any course could teach. We learned that packaging is part of the product. That unboxing creates an emotional first impression. That follow-up messages matter. That every single interaction is a chance to build trust.",
    },
    {
      type: "image",
      src: "/images/stories/desk-organizer.png",
      alt: "A geometric desk organizer catching warm light on a customer's desk",
    },
    {
      type: "paragraph",
      content:
        "Today, we're well past our first 10, but we still treat every order like it's the first. Because for that customer, it is.",
    },
  ],
};
