// components/Footer.jsx
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="
        bg-primary 
        bg-[url('/images/mandala-pattern.png')] 
        bg-cover 
        bg-center 
        py-6 sm:py-8 
        text-center
      "
    >
      <div className="container font-body text-cream text-sm sm:text-base">
        <p>
Questions?  <a href="mailto:aasthahurkat@gmail.com" className="underline">Get in&nbsp;touch </a> 
</p> <p>
          Aastha&nbsp;&amp;&nbsp;Preetesh’s Wedding &mdash; December&nbsp;23&ndash;24,&nbsp;2025</p>
      </div>
    </footer>
  );
}
