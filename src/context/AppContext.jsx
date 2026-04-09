import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const DEFAULT_SETTINGS = {
  general: {
    logoUrl: null,
    faviconUrl: null,
    siteName: 'Tâm Phúc',
    siteSubtitle: 'Trung Tâm Can Thiệp',
  },
  seo: {
    metaTitle: 'Trung Tâm Can Thiệp Tâm Phúc',
    metaDesc:
      'Trung Tâm Can Thiệp Tâm Phúc chuyên hỗ trợ trẻ gặp khó khăn về giao tiếp và tự kỷ với đội ngũ nhiều năm kinh nghiệm.',
    keywords: 'trung tâm tự kỷ, can thiệp tự kỷ, trẻ tự kỷ, tâm phúc',
  },
  contact: {
    phone: '0909 123 456',
    email: 'info@tamphuc.vn',
    address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 – Thứ 7: 7:30 – 17:30 | Chủ Nhật: 8:00 – 12:00',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
    zalo: '',
  },

  menu: [
    { id: 1, label: 'Trang Chủ', href: 'home', visible: true },
    { id: 2, label: 'Về Chúng Tôi', href: 'about', visible: true },
    { id: 3, label: 'Dịch Vụ', href: 'services', visible: true },
    { id: 4, label: 'Đội Ngũ', href: 'team', visible: true },
    { id: 5, label: 'Quy Trình', href: 'process', visible: true },
    { id: 7, label: 'Hình Ảnh', href: 'gallery', visible: true },
    { id: 6, label: 'Liên Hệ', href: 'contact', visible: true },
  ],

  hero: {
    imageUrl: null,
    badge: 'Hơn 10 năm đồng hành cùng các gia đình',
    title: 'Nâng Đỡ Mỗi Bước Chân',
    titleHighlight: 'Của Con Yêu',
    description:
      'Trung Tâm Can Thiệp <strong>Tâm Phúc</strong> chuyên hỗ trợ trẻ gặp khó khăn về giao tiếp và tự kỷ. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi đồng hành cùng gia đình trên hành trình phát triển của trẻ.',
    ctaPrimary: 'Tư Vấn Miễn Phí',
    ctaSecondary: 'Tìm Hiểu Thêm',
    stats: [
      { id: 1, num: '500', suffix: '+', label: 'Trẻ được hỗ trợ' },
      { id: 2, num: '10', suffix: '+', label: 'Năm kinh nghiệm' },
      { id: 3, num: '95', suffix: '%', label: 'Phụ huynh hài lòng' },
    ],
  },

  about: {
    imageMainUrl: null,
    imageSecondaryUrl: null,
    imageMainCaption: 'Đồng hành cùng gia đình',
    imageSecondaryCaption: 'Phương pháp khoa học',
    tag: 'Về Chúng Tôi',
    title: 'Sứ Mệnh Của Tâm Phúc',
    sectionDesc:
      'Chúng tôi tin rằng mỗi đứa trẻ đều có tiềm năng phát triển riêng – chỉ cần được đồng hành đúng cách.',
    expYears: '10+',
    subtitle: 'Tại sao chọn Tâm Phúc?',
    text1:
      'Được thành lập với mong muốn mang lại cơ hội phát triển bình đẳng cho mọi trẻ em, Trung Tâm Can Thiệp Tâm Phúc đã và đang là điểm tựa vững chắc cho hàng trăm gia đình trên hành trình đồng hành cùng con.',
    text2:
      'Chúng tôi áp dụng các phương pháp can thiệp được kiểm chứng khoa học, kết hợp với sự thấu hiểu và yêu thương, để giúp trẻ phát triển kỹ năng giao tiếp, tương tác xã hội và khả năng tự lập.',
    features: [
      { id: 1, icon: 'fa-certificate', title: 'Đội ngũ được chứng nhận', desc: 'Tất cả chuyên viên đều có bằng cấp chuyên môn và chứng chỉ quốc tế' },
      { id: 2, icon: 'fa-user-cog', title: 'Chương trình cá nhân hóa', desc: 'Mỗi trẻ được đánh giá riêng và xây dựng kế hoạch can thiệp phù hợp' },
      { id: 3, icon: 'fa-people-roof', title: 'Phối hợp gia đình', desc: 'Luôn đồng hành và hỗ trợ gia đình trong suốt quá trình can thiệp' },
    ],
  },

  servicesSection: {
    tag: 'Dịch Vụ',
    title: 'Chúng Tôi Hỗ Trợ',
    description: 'Các chương trình can thiệp toàn diện, được thiết kế riêng cho từng nhu cầu của trẻ.',
  },

  services: [
    { id: 1, icon: 'fa-comments', color: 'blue', featured: true, title: 'Can Thiệp Ngôn Ngữ & Giao Tiếp', desc: 'Đồng hành cùng trẻ trong hành trình nói được, hiểu đúng và giao tiếp tự tin — từ tiếp nhận ngôn ngữ đến tương tác trong sinh hoạt hằng ngày.', items: ['Đánh giá ngôn ngữ – giao tiếp theo mốc phát triển', 'Trị liệu ngôn ngữ cá nhân và nhóm nhỏ', 'Hỗ trợ AAC khi trẻ cần công cụ thay thế hoặc bổ trợ', 'Mục tiêu thực dụng: xin – cho, kể chuyện, trò chuyện ngắn'] },
    { id: 2, icon: 'fa-puzzle-piece', color: 'orange', featured: false, title: 'Tự kỷ', desc: 'Can thiệp sớm, có cấu trúc — kết hợp ABA, kỹ năng xã hội và phối hợp gia đình — giúp trẻ giảm hành vi khó, tăng tự lập và giao tiếp.', items: ['Đánh giá hành vi và năng lực hiện tại', 'Chương trình ABA và kỹ năng cá nhân hóa', 'Dạy kỹ năng xã hội, chơi có hướng dẫn', 'Hướng dẫn phụ huynh đồng nhất phương pháp tại nhà'] },
    { id: 3, icon: 'fa-hands', color: 'green', featured: false, title: 'Tăng động giảm chú ý', desc: 'Hỗ trợ trẻ tăng khả năng tập trung, kiềm chế xung động và hoàn thành nhiệm vụ — trong học tập, sinh hoạt và chơi cùng bạn.', items: ['Tổ chức không gian học và lịch trực quan', 'Huấn luyện chú ý và tự điều chỉnh hành vi', 'Chiến lược hoàn thành bài tập, giảm xao nhãng', 'Phối hợp phụ huynh – nhà trường khi cần'] },
    { id: 4, icon: 'fa-users', color: 'purple', featured: false, title: 'Rối loạn âm lời nói (ngọng)', desc: 'Can thiệp phát âm – ngữ âm có hệ thống, giúp trẻ nói rõ hơn, tự tin giao tiếp và bớt lo lắng khi bị hiểu sai.', items: ['Đánh giá lỗi âm và mức độ ảnh hưởng giao tiếp', 'Luyện từng âm vị theo trình tự khoa học', 'Bài tập vận động khẩu kết hợp trò chơi', 'Hướng dẫn phụ huynh luyện đúng tại nhà'] },
    { id: 5, icon: 'fa-house-user', color: 'pink', featured: false, title: 'Chậm phát triển tinh thần vận động', desc: 'Theo sát mốc phát triển vận động, nhận thức và tự phục vụ; chia nhỏ mục tiêu, đo lường tiến bộ để trẻ tích lũy kỹ năng bền vững.', items: ['Kích thích vận động tinh – thô phù hợp lứa tuổi', 'Phát triển nhận thức, ngôn ngữ tiền nền và chơi', 'Luyện tự phục vụ, an toàn trong ăn – mặc – vệ sinh', 'Đồng hành phụ huynh luyện tập mỗi ngày'] },
    { id: 6, icon: 'fa-clipboard-list', color: 'teal', featured: false, title: 'Khó khăn về học tập', desc: 'Nhận diện điểm nghẽn (đọc, viết, toán, chú ý…) và xây lộ trình hỗ trợ phù hợp — giúp trẻ theo kịp bài và giảm căng thẳng khi học.', items: ['Sàng lọc và đánh giá năng lực học tập cơ bản', 'Chiến lược học theo từng môn và từng em', 'Kỹ năng ôn tập, quản lý thời gian, tự kiểm tra', 'Trao đổi định kỳ với phụ huynh về tiến độ'] },
  ],

  processSection: {
    tag: 'Quy Trình',
    title: 'Hành Trình Bắt Đầu Từ Đây',
    description: 'Bốn bước đơn giản để bắt đầu hành trình phát triển cùng con.',
  },

  process: [
    { id: 1, num: '01', icon: 'fa-phone-volume', title: 'Liên hệ & Tư vấn ban đầu', desc: 'Gọi điện hoặc điền form để được tư vấn miễn phí. Chúng tôi sẽ lắng nghe và hiểu nhu cầu của gia đình bạn.' },
    { id: 2, num: '02', icon: 'fa-magnifying-glass-chart', title: 'Đánh giá toàn diện', desc: 'Đội ngũ chuyên gia thực hiện đánh giá chi tiết về các kỹ năng phát triển của trẻ trong 1–2 buổi.' },
    { id: 3, num: '03', icon: 'fa-file-pen', title: 'Xây dựng kế hoạch', desc: 'Lập kế hoạch can thiệp cá nhân hóa, thảo luận cùng gia đình để đảm bảo phù hợp và đồng thuận.' },
    { id: 4, num: '04', icon: 'fa-chart-line', title: 'Can thiệp & Theo dõi', desc: 'Triển khai chương trình, báo cáo tiến độ định kỳ và điều chỉnh kế hoạch phù hợp theo sự phát triển của trẻ.' },
  ],

  teamSection: {
    tag: 'Đội Ngũ',
    title: 'Những Người Đồng Hành',
    description: 'Đội ngũ chuyên gia tận tâm với nhiều năm kinh nghiệm trong lĩnh vực can thiệp trẻ tự kỷ.',
  },

  team: [
    { id: 1, avatarClass: 'team-card__avatar--1', icon: 'fa-user-tie', name: 'ThS. Nguyễn Thị Minh Tâm', role: 'Giám Đốc Chuyên Môn', desc: '15 năm kinh nghiệm trong can thiệp tự kỷ. Thạc sĩ Tâm lý học lâm sàng, chứng chỉ BCBA quốc tế.', tags: ['ABA', 'Tâm lý lâm sàng', 'BCBA'] },
    { id: 2, avatarClass: 'team-card__avatar--2', icon: 'fa-user-nurse', name: 'CN. Trần Thị Lan Anh', role: 'Chuyên Viên Ngôn Ngữ Trị Liệu', desc: '10 năm kinh nghiệm trị liệu ngôn ngữ, chuyên sâu về giao tiếp tăng cường và thay thế (AAC).', tags: ['Ngôn ngữ trị liệu', 'AAC'] },
    { id: 3, avatarClass: 'team-card__avatar--3', icon: 'fa-user-graduate', name: 'CN. Lê Văn Phúc', role: 'Chuyên Viên Hoạt Động Trị Liệu', desc: '8 năm kinh nghiệm hoạt động trị liệu, chuyên về hội nhập cảm giác và phát triển vận động.', tags: ['Hoạt động trị liệu', 'Cảm giác'] },
    { id: 4, avatarClass: 'team-card__avatar--4', icon: 'fa-user-doctor', name: 'ThS. Phạm Thị Hồng Nhung', role: 'Chuyên Viên Tâm Lý', desc: '12 năm kinh nghiệm tư vấn tâm lý trẻ em và gia đình. Chuyên gia hỗ trợ phụ huynh.', tags: ['Tâm lý trẻ em', 'Tư vấn gia đình'] },
  ],

  testimonialsSection: {
    tag: 'Cảm Nhận',
    title: 'Cha Mẹ Nói Gì?',
    description: 'Niềm tin và tình cảm của các gia đình là động lực lớn nhất của chúng tôi.',
  },

  testimonials: [
    { id: 1, featured: false, text: 'Sau 6 tháng can thiệp tại Tâm Phúc, con tôi đã có thể giao tiếp bằng lời nói. Điều này tưởng như không thể xảy ra với gia đình tôi. Cảm ơn đội ngũ đã không bỏ cuộc với con.', name: 'Chị Nguyễn Thị Hoa', child: 'Mẹ của bé Minh (6 tuổi)' },
    { id: 2, featured: true, text: 'Điều tôi trân trọng nhất ở Tâm Phúc là sự tận tâm. Các thầy cô không chỉ dạy con mà còn hướng dẫn chúng tôi cách đồng hành cùng con tại nhà. Con tiến bộ rõ rệt từng tháng.', name: 'Anh Trần Văn Bình', child: 'Bố của bé An (4 tuổi)' },
    { id: 3, featured: false, text: 'Lúc đầu tôi rất lo lắng và không biết phải làm gì. Tâm Phúc không chỉ giúp con mà còn giúp cả gia đình tôi hiểu và yêu con hơn theo cách đúng nhất.', name: 'Chị Lê Thị Mai', child: 'Mẹ của bé Khánh (5 tuổi)' },
  ],

  gallerySection: {
    tag: 'Hoạt Động',
    title: 'Hình Ảnh Hoạt Động',
    description: 'Khoảnh khắc tại trung tâm và các hoạt động đồng hành cùng trẻ.',
  },

  gallery: [],
}

function deepMerge(base, override) {
  const result = { ...base }
  for (const key of Object.keys(override ?? {})) {
    if (Array.isArray(override[key])) {
      result[key] = override[key]
    } else if (override[key] && typeof override[key] === 'object') {
      result[key] = deepMerge(base[key] ?? {}, override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

function migrateLegacy(parsed) {
  if (parsed?.settings?.general?.siteName != null) {
    return { settings: deepMerge(DEFAULT_SETTINGS, parsed.settings), contacts: parsed.contacts ?? [] }
  }

  const flat = parsed.settings || {}
  const logoUrl = flat.logo && String(flat.logo).startsWith('data:') ? flat.logo : flat.logoUrl ?? null

  const aboutRaw = parsed.about || {}
  const sectionDesc =
    aboutRaw.sectionDesc ?? aboutRaw.description ?? DEFAULT_SETTINGS.about.sectionDesc

  const teamRaw = parsed.team || DEFAULT_SETTINGS.team
  const team = teamRaw.map((t) => ({
    ...t,
    avatarClass: t.avatarClass ?? `team-card__avatar--${t.avatarColor ?? '1'}`,
  }))

  return {
    settings: {
      ...DEFAULT_SETTINGS,
      general: {
        logoUrl,
        faviconUrl: flat.faviconUrl ?? null,
        siteName: flat.siteName ?? DEFAULT_SETTINGS.general.siteName,
        siteSubtitle: flat.siteSubtitle ?? DEFAULT_SETTINGS.general.siteSubtitle,
      },
      seo: {
        metaTitle: flat.seoTitle ?? DEFAULT_SETTINGS.seo.metaTitle,
        metaDesc: flat.seoDescription ?? DEFAULT_SETTINGS.seo.metaDesc,
        keywords: flat.seoKeywords ?? DEFAULT_SETTINGS.seo.keywords,
      },
      contact: {
        phone: flat.phone ?? DEFAULT_SETTINGS.contact.phone,
        email: flat.email ?? DEFAULT_SETTINGS.contact.email,
        address: flat.address ?? DEFAULT_SETTINGS.contact.address,
        workingHours: flat.workingHours ?? DEFAULT_SETTINGS.contact.workingHours,
        facebook: flat.facebook ?? DEFAULT_SETTINGS.contact.facebook,
        youtube: flat.youtube ?? DEFAULT_SETTINGS.contact.youtube,
        tiktok: flat.tiktok ?? DEFAULT_SETTINGS.contact.tiktok,
        zalo: flat.zalo ?? DEFAULT_SETTINGS.contact.zalo,
      },
      menu: parsed.menu ?? DEFAULT_SETTINGS.menu,
      services: parsed.services ?? DEFAULT_SETTINGS.services,
      hero: parsed.hero ?? DEFAULT_SETTINGS.hero,
      about: { ...aboutRaw, sectionDesc, features: aboutRaw.features ?? DEFAULT_SETTINGS.about.features },
      process: parsed.process ?? DEFAULT_SETTINGS.process,
      team,
      testimonials: parsed.testimonials ?? DEFAULT_SETTINGS.testimonials,
      servicesSection: parsed.servicesSection ?? DEFAULT_SETTINGS.servicesSection,
      processSection: parsed.processSection ?? DEFAULT_SETTINGS.processSection,
      teamSection: parsed.teamSection ?? DEFAULT_SETTINGS.teamSection,
      testimonialsSection: parsed.testimonialsSection ?? DEFAULT_SETTINGS.testimonialsSection,
      gallery: parsed.gallery ?? DEFAULT_SETTINGS.gallery,
      gallerySection: parsed.gallerySection ?? DEFAULT_SETTINGS.gallerySection,
    },
    contacts: parsed.contacts ?? [],
  }
}

function loadStateFromLocalStorage() {
  try {
    const raw = localStorage.getItem('tamphuc_data')
    if (!raw) {
      return { settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), contacts: [] }
    }
    const parsed = JSON.parse(raw)
    const migrated = migrateLegacy(parsed)
    return {
      settings: deepMerge(DEFAULT_SETTINGS, migrated.settings),
      contacts: migrated.contacts ?? [],
    }
  } catch {
    return { settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), contacts: [] }
  }
}

const API_DATA = '/api/data'

async function fetchSiteData() {
  const res = await fetch(API_DATA)
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

async function persistSiteData(body) {
  const res = await fetch(API_DATA, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(String(res.status))
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => ({
    settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
    contacts: [],
  }))
  const [dataLoaded, setDataLoaded] = useState(false)
  const [canPersistToApi, setCanPersistToApi] = useState(false)
  const hydrated = useRef(false)
  const persistTimer = useRef(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const json = await fetchSiteData()
        if (cancelled) return
        const migrated = migrateLegacy(json)
        setData({
          settings: deepMerge(DEFAULT_SETTINGS, migrated.settings),
          contacts: migrated.contacts ?? [],
        })
        setCanPersistToApi(true)
      } catch {
        if (cancelled) return
        setData(loadStateFromLocalStorage())
        setCanPersistToApi(false)
      } finally {
        if (!cancelled) {
          hydrated.current = true
          setDataLoaded(true)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!hydrated.current || !dataLoaded) return
    clearTimeout(persistTimer.current)
    persistTimer.current = setTimeout(() => {
      if (!canPersistToApi) {
        try {
          localStorage.setItem('tamphuc_data', JSON.stringify({ settings: data.settings, contacts: data.contacts }))
        } catch (_) {}
        return
      }
      persistSiteData({ settings: data.settings, contacts: data.contacts }).catch((err) => {
        console.warn('[tamphuc] Không ghi được API, thử lưu cục bộ:', err)
        try {
          localStorage.setItem('tamphuc_data', JSON.stringify({ settings: data.settings, contacts: data.contacts }))
        } catch (_) {}
      })
    }, 700)
    return () => clearTimeout(persistTimer.current)
  }, [data.settings, data.contacts, dataLoaded, canPersistToApi])

  const nextId = () => Date.now() + Math.floor(Math.random() * 1000)

  const mergeSettings = (partial) => setData((p) => ({ ...p, settings: deepMerge(p.settings, partial) }))

  const saveSection = (section, value) => mergeSettings({ [section]: value })

  const saveMenu = (menu) => setData((p) => ({ ...p, settings: { ...p.settings, menu } }))

  const saveHero = (hero) => mergeSettings({ hero })

  const saveAbout = (about) => mergeSettings({ about })

  const crud = (key) => ({
    add: (item) =>
      setData((p) => ({
        ...p,
        settings: {
          ...p.settings,
          [key]: [...p.settings[key], { ...item, id: nextId() }],
        },
      })),
    update: (id, item) =>
      setData((p) => ({
        ...p,
        settings: {
          ...p.settings,
          [key]: p.settings[key].map((x) => (x.id === id ? { ...x, ...item } : x)),
        },
      })),
    remove: (id) =>
      setData((p) => ({
        ...p,
        settings: {
          ...p.settings,
          [key]: p.settings[key].filter((x) => x.id !== id),
        },
      })),
    reorder: (list) => setData((p) => ({ ...p, settings: { ...p.settings, [key]: list } })),
  })

  const addContact = (c) =>
    setData((p) => {
      const entry = { ...c, id: nextId(), date: new Date().toISOString(), read: false }
      const next = { ...p, contacts: [entry, ...p.contacts] }
      persistSiteData({ settings: next.settings, contacts: next.contacts }).catch((err) => {
        console.warn('[tamphuc] Không ghi được API khi thêm đăng ký tư vấn, thử lưu cục bộ:', err)
        try {
          localStorage.setItem('tamphuc_data', JSON.stringify({ settings: next.settings, contacts: next.contacts }))
        } catch (_) {}
      })
      return next
    })

  const markRead = (id) =>
    setData((p) => ({
      ...p,
      contacts: p.contacts.map((c) => (c.id === id ? { ...c, read: true } : c)),
    }))

  const deleteContact = (id) => setData((p) => ({ ...p, contacts: p.contacts.filter((c) => c.id !== id) }))

  return (
    <AppContext.Provider
      value={{
        settings: data.settings,
        contacts: data.contacts,
        dataLoaded,
        mergeSettings,
        saveSection,
        saveMenu,
        saveHero,
        saveAbout,
        servicesCrud: crud('services'),
        processCrud: crud('process'),
        teamCrud: crud('team'),
        addContact,
        markRead,
        deleteContact,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
