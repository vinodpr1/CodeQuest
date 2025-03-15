import React from "react";
import Hero from "./Hero";
import Events from "./Events";
import Questions from "./Questions";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <main className="container flex-1">
        <Hero />
        <Events />
        <section>
          <div>
            <Questions />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;

// import "../app/globals.css";
// import Hero from "./Hero";
// import Events from "./Events";
// import Questions from "./Questions";

// export default function Landing() {
//   return (
//     <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
//       <main className="flex-1">
//         <Hero />
//         <Events />
//         <section>
//           <div>
//             <Questions />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
