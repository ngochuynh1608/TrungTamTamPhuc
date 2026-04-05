import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function ServiceCard({ service, index }) {
  const ref = useScrollAnimation()
  return (
    <div
      className={`service-card${service.featured ? ' service-card--featured' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {service.featured && <div className="service-card__badge">Phổ biến nhất</div>}
      <div className={`service-card__icon service-card__icon--${service.color}`}>
        <i className={`fas ${service.icon}`} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <ul className="service-card__list">
        {service.items.map(item => (
          <li key={item}><i className="fas fa-check" />{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
  const { settings } = useApp()
  const sec = settings.servicesSection

  return (
    <section className="services section section--alt" id="services">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">{sec.tag}</span>
          <h2 className="section__title">{sec.title}</h2>
          <p className="section__desc">{sec.description}</p>
        </div>
        <div className="services__grid">
          {settings.services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
