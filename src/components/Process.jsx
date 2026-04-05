import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function StepCard({ step, index }) {
  const ref = useScrollAnimation()

  return (
    <div className="process__step" ref={ref} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="process__step-num">{step.num}</div>
      <div className="process__step-icon">
        <i className={`fas ${step.icon}`} />
      </div>
      <h3 className="process__step-title">{step.title}</h3>
      <p className="process__step-desc">{step.desc}</p>
    </div>
  )
}

export default function Process() {
  const { settings } = useApp()
  const sec = settings.processSection

  return (
    <section className="process section" id="process">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">{sec.tag}</span>
          <h2 className="section__title">{sec.title}</h2>
          <p className="section__desc">{sec.description}</p>
        </div>

        <div className="process__steps">
          <div className="process__line" />
          {settings.process.map((s, i) => (
            <StepCard key={s.id} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
