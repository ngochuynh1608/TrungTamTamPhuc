import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
  const { settings } = useApp()
  const about = settings.about
  const sectionDesc = about.sectionDesc ?? about.description
  const contentRef = useScrollAnimation()

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">{about.tag}</span>
          <h2 className="section__title">{about.title}</h2>
          <p className="section__desc">{sectionDesc}</p>
        </div>

        <div className="about__grid">
          <div className="about__visual">
            <div className="about__img-main">
              {about.imageMainUrl ? (
                <div className="about__photo-frame">
                  <img src={about.imageMainUrl} alt="" className="about__photo about__photo--lg" />
                  {about.imageMainCaption && (
                    <p className="about__photo-label">{about.imageMainCaption}</p>
                  )}
                </div>
              ) : (
                <div className="about__img-placeholder">
                  <i className="fas fa-hands-holding-child" />
                  <p>{about.imageMainCaption || 'Đồng hành cùng gia đình'}</p>
                </div>
              )}
            </div>
            <div className="about__img-secondary">
              {about.imageSecondaryUrl ? (
                <div className="about__photo-frame about__photo-frame--sm">
                  <img src={about.imageSecondaryUrl} alt="" className="about__photo about__photo--sm" />
                  {about.imageSecondaryCaption && (
                    <p className="about__photo-label about__photo-label--sm">{about.imageSecondaryCaption}</p>
                  )}
                </div>
              ) : (
                <div className="about__img-placeholder about__img-placeholder--sm">
                  <i className="fas fa-brain" />
                  <p>{about.imageSecondaryCaption || 'Phương pháp khoa học'}</p>
                </div>
              )}
            </div>
            <div className="about__exp-badge">
              <span className="about__exp-num">{about.expYears}</span>
              <span className="about__exp-text">Năm Kinh Nghiệm</span>
            </div>
          </div>

          <div className="about__content" ref={contentRef}>
            <h3 className="about__subtitle">{about.subtitle}</h3>
            <p className="about__text">{about.text1}</p>
            <p className="about__text">{about.text2}</p>

            <div className="about__features">
              {(about.features || []).map(f => (
                <div className="feature-item" key={f.id}>
                  <div className="feature-item__icon">
                    <i className={`fas ${f.icon}`} />
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
