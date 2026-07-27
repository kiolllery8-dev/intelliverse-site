export default function SiteFooter() {
  return (
    <footer id="contact">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-cta">
            <div className="footer-kicker">— GET IN TOUCH</div>
            <h2>
              有想做的事，<br />
              就直接 <em>寫信聊聊</em> 吧。
            </h2>
            <p>
              不論是一顆還在草稿階段的點子、一款需要重新被設計的既有商品，
              或是一次需要加速的廣告投放，都歡迎直接聯絡我們。
            </p>
          </div>
          <div className="footer-block">
            <h4>CONTACT</h4>
            <a href="mailto:linsonder6@gmail.com" className="big-link">linsonder6@gmail.com</a>
            <a href="tel:+886926213896" className="big-link">+886 926-213-896</a>
            <p>週一至週五 10:00–23:00</p>
          </div>
          <div className="footer-block">
            <h4>STUDIO</h4>
            <p>靈境智造</p>
            <p>INTELLIVERSE STUDIO</p>
            <address>臺中市太平區精美路 122 號</address>
            <p className="footer-tag">Design · Engineering · Media</p>
          </div>
        </div>
        <div className="footer-base">
          <div>© 2026 INTELLIVERSE STUDIO · 靈境智造 · ALL RIGHTS RESERVED</div>
          <div>HARDWARE · SOFTWARE · DESIGN · MEDIA</div>
        </div>
      </div>
    </footer>
  );
}
