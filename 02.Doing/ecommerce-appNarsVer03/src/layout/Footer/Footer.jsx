import Icon from "../../components/common/Icon/Icon";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Main Footer */}
      <section className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <a href="/" className="logo">
                  eshop.com
                </a>
              </div>
              <p className="footer-description">
                Tu tienda online de confianza. Ofrecemos los mejores productos
                con la mejor calidad y servicio al cliente excepcional.
              </p>
              <div className="social-links">
                <h4>Síguenos</h4>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook">
                    <Icon name="facebook" size={20} />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <Icon name="twitter" size={20} />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Icon name="instagram" size={20} />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <Icon name="linkedin" size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3>Categorías</h3>
              <ul>
                <li>
                  <a href="#">Electrónicos</a>
                </li>
                <li>
                  <a href="#">Moda</a>
                </li>
                <li>
                  <a href="#">Hogar</a>
                </li>
                <li>
                  <a href="#">Deportes</a>
                </li>
                <li>
                  <a href="#">Belleza</a>
                </li>
                <li>
                  <a href="#">Ofertas del Día</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3>Atención al Cliente</h3>
              <ul>
                <li>
                  <a href="#">Centro de Ayuda</a>
                </li>
                <li>
                  <a href="#">Cómo Comprar</a>
                </li>
                <li>
                  <a href="#">Envíos y Devoluciones</a>
                </li>
                <li>
                  <a href="#">Guía de Tallas</a>
                </li>
                <li>
                  <a href="#">Contacto</a>
                </li>
                <li>
                  <a href="#">Garantías</a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h3>Empresa</h3>
              <ul>
                <li>
                  <a href="#">Sobre Nosotros</a>
                </li>
                <li>
                  <a href="#">Trabaja con Nosotros</a>
                </li>
                <li>
                  <a href="#">Prensa</a>
                </li>
                <li>
                  <a href="#">Inversionistas</a>
                </li>
                <li>
                  <a href="#">Sostenibilidad</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="footer-trust">
        <div className="container">
          <div className="trust-content">
            <div className="trust-item">
              <Icon name="shield" size={24} />
              <div>
                <strong>Compra Segura</strong>
                <span>Protección SSL</span>
              </div>
            </div>
            <div className="trust-item">
              <Icon name="truck" size={24} />
              <div>
                <strong>Envío Gratis</strong>
                <span>En pedidos +$50</span>
              </div>
            </div>
            <div className="trust-item">
              <Icon name="rotateLeft" size={24} />
              <div>
                <strong>30 Días</strong>
                <span>Garantía de devolución</span>
              </div>
            </div>
            <div className="trust-item">
              <Icon name="headphones" size={24} />
              <div>
                <strong>Soporte 24/7</strong>
                <span>Atención al cliente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="footer-payment">
        <div className="container">
          <div className="payment-content">
            <div className="payment-section">
              <h4>Métodos de Pago</h4>
              <div className="payment-icons">
                <Icon name="visa" size={32} />
                <Icon name="mastercard" size={32} />
                <Icon name="amex" size={32} />
                <Icon name="paypal" size={32} />
                <Icon name="applepay" size={32} />
                <Icon name="googlepay" size={32} />
              </div>
            </div>
            <div className="contact-info">
              <h4>Contacto</h4>
              <div className="contact-details">
                <span>
                  <Icon name="phone" size={16} />
                  800-ESHOP-247
                </span>
                <span>
                  <Icon name="mail" size={16} />
                  help@eshop.com
                </span>
                <span>
                  <Icon name="clock" size={16} />
                  Lun-Dom 24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <section className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} eshop.com. Todos los derechos
              reservados.
            </p>
            <nav className="legal-links">
              <a href="#">Política de Privacidad</a>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Cookies</a>
              <a href="#">Accesibilidad</a>
              <a href="#">Mapa del Sitio</a>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
}
