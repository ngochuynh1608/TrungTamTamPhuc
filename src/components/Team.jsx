import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function TeamCard({ member, index }) {
  const ref = useScrollAnimation()

  return (
    <div className="team-card" ref={ref} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className={`team-card__avatar ${member.avatarClass}`}>
        <i className={`fas ${member.icon}`} />
      </div>
      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <span className="team-card__role">{member.role}</span>
        <p className="team-card__desc">{member.desc}</p>
        <div className="team-card__tags">
          {member.tags.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const { settings } = useApp()
  const sec = settings.teamSection

  return (
    <section className="team section section--alt" id="team">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">{sec.tag}</span>
          <h2 className="section__title">{sec.title}</h2>
          <p className="section__desc">{sec.description}</p>
        </div>

        <div className="team__grid">
          {settings.team.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
