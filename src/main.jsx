import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const heroCards = [
  { title: "安抚玩偶", src: "/assets/boom-01.png" },
  { title: "彩窗磁力片", src: "/assets/boom-02.jpg" },
  { title: "充气帐篷", src: "/assets/update-carousel-tent.png" },
  { title: "儿童手机", src: "/assets/boom-04.jpg" },
  { title: "防惊跳萝卜", src: "/assets/boom-05.jpg" },
  { title: "户外帐篷", src: "/assets/boom-06.png" },
  { title: "教师节花束", src: "/assets/boom-07.png" },
  { title: "喇叭玩具", src: "/assets/boom-08.jpg" },
  { title: "曼哈顿球", src: "/assets/boom-09.jpg" },
  { title: "便携燃气烤炉", src: "/assets/update-carousel-grill.png" },
  { title: "睡前有声书", src: "/assets/boom-11.png" },
  { title: "太空闯关大冒险", src: "/assets/boom-12.jpg" },
  { title: "瓦力机器人", src: "/assets/boom-13.jpg" },
  { title: "学爬鸭", src: "/assets/boom-14.jpg" },
  { title: "正姿矫正笔", src: "/assets/boom-15.jpg" },
  { title: "坐姿矫正器", src: "/assets/boom-16.jpg" }
];

const optimizedAsset = (src) => src.replace("/assets/", "/assets/optimized/").replace(/\.(png|jpe?g)$/i, ".jpg");
const INITIAL_WORK_COUNT = 16;
const tinyPixel = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

const timeline = [
  { period: "2022.03 - 2022.06", company: "华尔集团", role: "3D 设计师", text: "负责产品建模、样机渲染与场景完善，建立商业渲染、结构理解与材质表达能力。" },
  { period: "2022.06 - 2023.11", company: "郑州景乔信息科技有限公司", role: "设计主管", text: "负责科巢旗舰店的电商视觉升级与效果图规范建设，推动主图、详情页、场景渲染和团队协作流程标准化，沉淀可复用的母婴类目视觉资产。" },
  { period: "2023.12 - 2025.12", company: "长沙越途电子商务有限公司", role: "设计组长 / AI架构负责人", text: "将 ComfyUI 引入场景生成、模特生成、局部修改与电商视觉模板生产，搭建设计团队可复用的 AIGC 生产流程与自动化节点体系。" },
  { period: "2026.01 - 至今", company: "MirCamping", role: "设计总监 / AI 架构负责人", text: "主导跨境户外品牌视觉升级、VI 规范和 AI 生图模板落地，推动 Ozon 店铺排名从第 30 名提升至第 2 名。" }
];

const strengths = [
  { title: "品牌升级能力", text: "能够从品牌定位、用户画像、竞品语境与平台规则出发，重建 Logo、VI、品牌白皮书、线上触点与商品表达体系，把分散素材升级为可持续复用的品牌资产，并提升视觉统一度与溢价感。", tags: ["Brand Book", "VI System", "Premium Visual"] },
  { title: "AI 落地能力", text: "不是单点使用 AI，而是把 ComfyUI、libtv、LoRA、SDXL/FLUX 与 3D 渲染封装成团队可直接调用的生产流程，让不会 AI 的设计与运营也能稳定使用自动化节点完成提效。", tags: ["ComfyUI", "LoRA", "Automation"] },
  { title: "视觉系统搭建能力", text: "把主图、详情页、活动页、包装、内容模板与场景图统一到一套设计语言中，建立规范、组件与审核标准，减少重复沟通，让风格稳定延展。", tags: ["Visual System", "Design Rules", "Templates"] },
  { title: "团队管理能力", text: "通过项目中台、AI 中台、能力矩阵与培训机制，让 21 人团队的能力、目标、激励和产出节奏变得可视化，推动团队从执行型设计转向系统型生产。", tags: ["Design Ops", "Skill Matrix", "Training"] },
  { title: "电商增长能力", text: "理解点击、转化、排名、FABE 逻辑和品牌内容之间的关系，能把视觉策略落实到主图、详情页与店铺资产中，让设计直接服务 GMV、转化率和平台排名。", tags: ["GMV Growth", "Conversion", "Ozon / Tmall"] }
];

const projects = [
  {
    no: "01",
    title: "AIGC 设计工作流开发",
    role: "技术架构负责人",
    period: "2023.12 - 2025.12",
    link: "/cases/aigc-workflow.html",
    image: "/assets/case-comfyui.png",
    result: "沉淀 20+ 自动化工作流节点，多次获得月度创新奖、季度研发奖与年度最佳奖。",
    text: "基于 ComfyUI 整合 Flux、SDXL、LoRA、3D 渲染与 libtv 模板，把一键优化、扩图、抠图、视角调整、局部修改、场景模特生成等能力封装为团队可复用的生产系统。",
    tags: ["ComfyUI", "20+节点", "LORA训练", "节点开发", "Skill训练"]
  },
  {
    no: "02",
    title: "奕思瑞品牌全案升级",
    role: "品牌视觉升级负责人",
    period: "2025.01 - 2025.06",
    link: "/cases/esr-brand.html",
    image: "/assets/case-esr-cover.png",
    result: "品牌定位更精准，线上视觉更统一，店铺业绩较前增长约 30%。",
    text: "围绕品牌识别、产品价值与线上触点重建视觉语言，并将 FABE 销售逻辑转译为更清晰的详情页与内容模板。",
    tags: ["品牌策划", "FABE", "VI设计", "视觉升级", "30%业绩增长"]
  },
  {
    no: "03",
    title: "MirCamping 品牌视觉升级",
    role: "品牌视觉升级策划总监",
    period: "2026.01 - 2026.04",
    link: "/cases/mircamping.html",
    image: "/assets/case-mir-cover.png",
    result: "月均 GMV 从 100w 提升至 300w，Ozon 店铺排名从第 30 名提升至第 2 名。",
    text: "针对俄罗斯 Ozon 用户画像与竞品视觉，完成品牌白皮书、Logo、视觉体系与规范，并用 ComfyUI + libtv 提升旧品视觉迭代效率。",
    tags: ["品牌策划", "VI设计", "视觉升级", "OZON No.2", "300w GMV"]
  }
];

const projectTemplates = [
  { no: "04", title: "公司官网重做升级", label: "WEBSITE REDESIGN", type: "website", role: "项目角色待补充", result: "围绕品牌展示、内容架构与浏览体验，搭建公司官网升级项目模板。", tags: ["Codex", "Cloudflare"] },
  { no: "05", title: "企业级 AI 工具开发", label: "ENTERPRISE AI", type: "ai", role: "项目角色待补充", result: "围绕企业业务场景、工具能力与协作流程，搭建 AI 工具开发项目模板。", tags: ["待补充"] },
  { no: "06", title: "待定", label: "NEXT PROJECT", type: "pending", role: "项目方向待定", result: "预留项目位置，后续补充项目背景、职责与成果。", tags: ["待补充"] }
];

const workSingles = [
  {
    "src": "/assets/work-show-29.png",
    "title": "轮船玩具",
    "width": 980,
    "height": 499
  },
  {
    "src": "/assets/work-show-36.jpg",
    "title": "信任背书",
    "width": 680,
    "height": 1147
  },
  {
    "src": "/assets/work-show-35.png",
    "title": "太空闯关大冒险",
    "width": 680,
    "height": 1439
  },
  {
    "src": "/assets/work-show-27.png",
    "title": "火箭储钱罐",
    "width": 680,
    "height": 1439
  },
  {
    "src": "/assets/work-show-19.png",
    "title": "弹珠机",
    "width": 680,
    "height": 1994
  },
  {
    "src": "/assets/work-show-06.jpg",
    "title": "彩窗磁力片",
    "width": 680,
    "height": 907
  },
  {
    "src": "/assets/work-show-08.jpg",
    "title": "彩窗磁力片",
    "width": 680,
    "height": 911
  },
  {
    "src": "/assets/work-show-01.jpg",
    "title": "5档计算器",
    "width": 680,
    "height": 1209
  },
  {
    "src": "/assets/work-show-02.jpg",
    "title": "安抚玩偶",
    "width": 680,
    "height": 1158,
    "crop": {
      "left": 20,
      "right": 20,
      "top": 2,
      "bottom": 20
    }
  },
  {
    "src": "/assets/work-show-03.png",
    "title": "安抚鸭",
    "width": 680,
    "height": 1020,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/work-show-05.jpg",
    "title": "吧唧打印机",
    "width": 680,
    "height": 1085
  },
  {
    "src": "/assets/work-show-09.jpg",
    "title": "茶房坳",
    "width": 680,
    "height": 907
  },
  {
    "src": "/assets/work-show-11.jpg",
    "title": "超轻黏土",
    "width": 680,
    "height": 680
  },
  {
    "src": "/assets/work-show-12.jpg",
    "title": "超轻黏土",
    "width": 680,
    "height": 907
  },
  {
    "src": "/assets/work-show-13.png",
    "title": "超轻黏土",
    "width": 551,
    "height": 733
  },
  {
    "src": "/assets/update-work-01.png",
    "title": "充气床垫 · 家居场景",
    "width": 1500,
    "height": 2000
  },
  {
    "src": "/assets/update-work-02.png",
    "title": "便携烤炉 · 家庭场景",
    "width": 1500,
    "height": 2000
  },
  {
    "src": "/assets/update-work-03.png",
    "title": "水上浮床 · 夏日场景",
    "width": 1500,
    "height": 2000
  },
  {
    "src": "/assets/update-work-04.png",
    "title": "MirCamping 户外展会海报",
    "width": 1748,
    "height": 2480
  },
  {
    "src": "/assets/update-work-05.jpg",
    "title": "消防轮船玩具",
    "width": 1440,
    "height": 1440
  },
  {
    "src": "/assets/update-work-06.png",
    "title": "户外睡袋",
    "width": 1500,
    "height": 2000
  },
  {
    "src": "/assets/work-show-14.png",
    "title": "超清黏土",
    "width": 548,
    "height": 730
  },
  {
    "src": "/assets/work-show-15.png",
    "title": "超清黏土",
    "width": 549,
    "height": 728
  },
  {
    "src": "/assets/work-show-16.jpg",
    "title": "超清黏土",
    "width": 680,
    "height": 907
  },
  {
    "src": "/assets/work-show-18.jpg",
    "title": "打地鼠",
    "width": 680,
    "height": 1151
  },
  {
    "src": "/assets/work-show-20.jpg",
    "title": "儿童口琴",
    "width": 680,
    "height": 907
  },
  {
    "src": "/assets/work-show-21.jpg",
    "title": "儿童手机",
    "width": 680,
    "height": 680
  },
  {
    "src": "/assets/work-show-22.png",
    "title": "儿童坦克车",
    "width": 601,
    "height": 805
  },
  {
    "src": "/assets/work-show-25.png",
    "title": "儿童玩具车",
    "width": 550,
    "height": 732
  },
  {
    "src": "/assets/work-show-26.jpg",
    "title": "缝缝乐",
    "width": 680,
    "height": 1237
  },
  {
    "src": "/assets/work-show-31.jpg",
    "title": "品牌调性附加",
    "width": 680,
    "height": 1190,
    "crop": {
      "left": 20,
      "right": 20,
      "top": 2,
      "bottom": 20
    }
  },
  {
    "src": "/assets/work-show-32.jpg",
    "title": "品牌物料",
    "width": 680,
    "height": 906
  },
  {
    "src": "/assets/work-show-33.jpg",
    "title": "水果清洗剂",
    "width": 680,
    "height": 680
  },
  {
    "src": "/assets/work-show-34.jpg",
    "title": "睡前有声书",
    "width": 480,
    "height": 720
  },
  {
    "src": "/assets/work-show-37.png",
    "title": "学爬鸭",
    "width": 670,
    "height": 671
  },
  {
    "src": "/assets/work-show-38.jpg",
    "title": "学饮杯",
    "width": 680,
    "height": 680
  }
];

const detailWorks = [
  {
    "src": "/assets/portfolio-detail-00.jpg",
    "title": "星星公益详情页",
    "width": 440,
    "height": 4615,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/portfolio-detail-01.jpg",
    "title": "篮球架详情页",
    "width": 440,
    "height": 11055,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/portfolio-detail-02.jpg",
    "title": "多功能棋盘详情页",
    "width": 440,
    "height": 12153,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/portfolio-detail-03.jpg",
    "title": "存钱罐详情页",
    "width": 440,
    "height": 8667,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/portfolio-detail-04.jpg",
    "title": "太空主题详情页",
    "width": 440,
    "height": 8275,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  },
  {
    "src": "/assets/portfolio-detail-05.jpg",
    "title": "新版详情页",
    "width": 440,
    "height": 10632,
    "crop": {
      "left": 2,
      "right": 2,
      "top": 2,
      "bottom": 2
    }
  }
];

function useReveal() {
  useEffect(() => {
    const observed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -10% 0px" });

    const observeRevealItems = (root = document) => {
      root.querySelectorAll("[data-reveal]").forEach((el, index) => {
        if (observed.has(el)) return;
        observed.add(el);
        el.style.setProperty("--delay", `${(index % 7) * 70}ms`);
        observer.observe(el);
      });
    };

    observeRevealItems();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) observeRevealItems(node.parentElement || document);
          else observeRevealItems(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}

function usePointer() {
  useEffect(() => {
    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--mx", x.toFixed(4));
      document.documentElement.style.setProperty("--my", y.toFixed(4));

      const card = event.target.closest("[data-tilt]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--px", `${event.clientX - rect.left}px`);
      card.style.setProperty("--py", `${event.clientY - rect.top}px`);
      card.style.setProperty("--rx", `${(((event.clientY - rect.top) / rect.height - 0.5) * -8).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(((event.clientX - rect.left) / rect.width - 0.5) * 8).toFixed(2)}deg`);
    };
    const onOut = (event) => {
      const card = event.target.closest("[data-tilt]");
      if (!card) return;
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);
}

function Navbar() {
  return (
    <header className="nav">
      <a className="logo-pill" href="#top">Skillora-L</a>
      <nav className="nav-links" aria-label="主导航">
        <a href="#about">个人简介</a>
        <a href="#strengths">个人优势</a>
        <a href="#projects">项目经历</a>
        <a href="#works">作品展示</a>
      </nav>
      <a className="nav-cta" href="#contact">联系我</a>
    </header>
  );
}

function Hero({ onPreview }) {
  const stripRef = useRef(null);
  const orbitRef = useRef(null);
  const [loadCaseImages, setLoadCaseImages] = useState(false);
  const cards = useMemo(() => heroCards, []);

  useEffect(() => {
    const updateOrbitState = () => {
      orbitRef.current?.classList.toggle("is-page-scrolled", window.scrollY > 80);
    };
    updateOrbitState();
    window.addEventListener("scroll", updateOrbitState, { passive: true });
    return () => window.removeEventListener("scroll", updateOrbitState);
  }, []);

  useEffect(() => {
    const load = () => setLoadCaseImages(true);
    const timer = window.setTimeout(load, 1200);
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(load, { timeout: 1800 }) : null;
    return () => {
      window.clearTimeout(timer);
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
    };
  }, []);

  const onWheel = (event) => {
    if (!stripRef.current || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    stripRef.current.scrollLeft += event.deltaY;
  };

  const onCardEnter = (event) => {
    setLoadCaseImages(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const pageCenter = window.innerWidth / 2;
    orbitRef.current?.classList.toggle("center-pop", Math.abs(cardCenter - pageCenter) < 190);
  };

  const onCardLeave = () => {
    orbitRef.current?.classList.remove("center-pop");
  };

  return (
    <section className="hero" id="top">
      <img className="hero-bg" src="/assets/optimized/hero-cover.jpg" alt="Skillora-L 首屏封面" fetchPriority="high" decoding="async" />
      <div className="hero-shade" />
      <Navbar />
      <div className="hero-content">
        <p className="hero-role">品牌视觉总监 × AI 工作流架构师</p>
        <h1><span>Skillora-L</span><small>Visual system portfolio</small></h1>
        <p className="hero-copy">用视觉系统与 AI 工作流，让品牌内容更快、更准、更有辨识度。</p>
        <div className="hero-metrics">
          <span><b>300W</b>月均 GMV</span>
          <span><b>20+</b>AI 工作流节点</span>
          <span><b>21</b>人团队重塑</span>
        </div>
      </div>

      <div className="case-orbit" ref={orbitRef}>
        <div className="case-title">
          <span>爆款案例</span>
          <p>Hover to reveal selected visuals</p>
        </div>
        <div className="case-track" ref={stripRef} onWheel={onWheel}>
          <div className="case-row">
            {cards.map((item, index) => (
              <button className="orbit-card" key={`${item.src}-${index}`} onClick={() => onPreview(optimizedAsset(item.src))} onPointerEnter={onCardEnter} onPointerLeave={onCardLeave} data-tilt>
                <span>{item.title}</span>
                <div className="orbit-glass">案例预览</div>
                <img src={loadCaseImages ? optimizedAsset(item.src) : tinyPixel} alt={`${item.title}作品案例预览`} loading="lazy" decoding="async" fetchPriority="low" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, software }) {
  return (
    <div className="section-head" data-reveal>
      <p>{eyebrow}</p>
      <div className="section-heading-line"><h2>{title}</h2>{software && <span className="work-software">使用软件：{software}</span>}</div>
    </div>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <SectionHead eyebrow="WORK EXPERIENCE" title="个人简介" />
      <div className="about-grid">
        <figure className="portrait-card" data-reveal data-tilt>
          <img src="/assets/profile-photo.jpg" alt="刘豪政个人照片" loading="lazy" decoding="async" />
        </figure>
        <div className="about-copy" data-reveal data-tilt>
          <p className="eyebrow">ABOUT SKILLORA-L</p>
          <h3>Hi, I am 刘豪政!</h3>
          <p>五年电商设计经验，两年管理经验。长期深耕品牌策划、电商视觉、3D 渲染与 AIGC 工作流，擅长把品牌定位、视觉规范、AI 自动化节点和团队管理机制整合成可落地的设计生产系统。</p>
          <div className="about-meta">
            <span><b>设计定位</b>品牌视觉总监 / AI 工作流架构师</span>
            <span><b>工作方式</b>视觉系统 × 自动化流程 × 增长验证</span>
            <span><b>核心能力</b>视觉系统、AI 提效、团队管理、增长视觉</span>
            <span><b>项目结果</b>Ozon No.2 / 300w GMV / 30% 增长</span>
          </div>
          <div className="about-numbers">
            <strong><b>5年+</b><span>电商视觉经验</span></strong>
            <strong><b>20+</b><span>自动化节点</span></strong>
            <strong><b>21人</b><span>团队能力重塑</span></strong>
          </div>
        </div>
      </div>
      <div className="career-line" data-reveal>
        {timeline.map((item) => (
          <article key={item.period} data-tilt>
            <i />
            <span>{item.period}</span>
            <h4>{item.company}</h4>
            <strong>{item.role}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <SectionHead eyebrow="CORE STRENGTHS" title="个人优势" />
      <div className="strength-grid">
        {strengths.map((item, index) => (
          <article className="strength-card" key={item.title} data-reveal data-tilt>
            <h3>{item.title}<i>.</i></h3>
            <p>{item.text}</p>
            <div>{item.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHead eyebrow="SELECTED PROJECTS" title="项目经历" />
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-row" key={project.title} data-reveal data-tilt>
            <a className="project-cover" href={project.link} target="_blank" rel="noreferrer">
            <img src={optimizedAsset(project.image)} alt={`${project.title} 封面`} loading="lazy" decoding="async" fetchPriority="low" />
            </a>
            <div className="project-copy">
              <span>{project.no} / {project.period}</span>
              <h3>{project.title}</h3>
              <p className="project-role">{project.role}</p>
              <strong>{project.result}</strong>
              <p className="project-detail">{project.text}</p>
              <div>{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">查看项目详情</a>
            </div>
          </article>
        ))}
        {projectTemplates.map((project) => (
          <article className="project-row project-template" key={project.no} data-reveal data-tilt>
            <div className={`project-cover template-cover template-${project.type}`} aria-label={`${project.title}模板封面`}>
              <span className="template-cover-label">{project.label}</span>
              <div className="template-visual" aria-hidden="true"><i /><i /><i /></div>
              <span className="template-cover-number">{project.no}</span>
            </div>
            <div className="project-copy">
              <span>{project.no} / 项目模板 · 时间待补充</span>
              <h3>{project.title}</h3>
              <p className="project-role">{project.role}</p>
              <strong>{project.result}</strong>
              <div>{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>
              <span className="project-template-status">内容筹备中</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const videoWorks = [
  { id: "06", title: "MIR-2017MC 产品视频" },
  { id: "01", title: "MIR-2905 产品视频" },
  { id: "02", title: "MIR-1012-2 产品视频" },
  { id: "04", title: "MIR-HB-2K 产品视频" },
  { id: "03", title: "MIR-0632XL 产品视频" },
  { id: "05", title: "CF-010 产品视频" }
];

function ProductVideos() {
  const gridRef = useRef(null);
  const onPlay = (event) => {
    gridRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== event.currentTarget) video.pause();
    });
  };

  return (
    <>
      <div className="work-subhead detail-head" id="ai-videos" data-reveal>
        <span>03 / AI Product Videos</span>
      </div>
      <div className="detail-work-grid video-work-grid" ref={gridRef}>
        {videoWorks.map((item) => (
          <figure className="video-work-card" key={item.id} data-reveal>
            <video controls playsInline preload="none" poster={`/assets/videos/ai-product-${item.id}-cover-v2.jpg`} aria-label={item.title} onPlay={onPlay}>
              <source src={`/assets/videos/ai-product-${item.id}.mp4`} type="video/mp4" />
              您的浏览器暂不支持视频播放。
            </video>
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

function workImageSize(item) {
  const crop = item.crop || { left: 0, right: 0, top: 0, bottom: 0 };
  return { width: item.width - crop.left - crop.right, height: item.height - crop.top - crop.bottom };
}

function WorkImage({ item, preview = false }) {
  const { width, height } = workImageSize(item);
  const crop = item.crop || { left: 0, top: 0 };
  return (
    <span className="work-image-frame" style={{ aspectRatio: width / height, "--image-ratio": width / height }}>
      <img src={optimizedAsset(item.src)} alt={item.title} width={item.width} height={item.height}
        loading={preview ? "eager" : "lazy"} decoding="async"
        style={{ width: (item.width / width * 100) + "%", left: (-crop.left / width * 100) + "%", top: (-crop.top / height * 100) + "%" }} />
    </span>
  );
}

function Works({ onPreview }) {
  const [showAllWorks, setShowAllWorks] = useState(false);
  const visibleSingles = showAllWorks ? workSingles : workSingles.slice(0, INITIAL_WORK_COUNT);
  const featuredWork = workSingles[0];
  const columnsRef = useRef(null);
  const [gallerySize, setGallerySize] = useState({ width: 1200, count: window.innerWidth <= 760 ? 1 : 3 });
  useEffect(() => {
    const grid = columnsRef.current;
    const update = () => {
      const width = grid.clientWidth;
      const count = window.innerWidth <= 760 ? 1 : 3;
      setGallerySize((previous) => previous.width === width && previous.count === count ? previous : { width, count });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(grid);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  const restWorkColumns = Array.from({ length: gallerySize.count }, () => []);
  const columnHeights = Array(gallerySize.count).fill(0);
  const imageWidth = Math.max(1, (gallerySize.width - 14 * (gallerySize.count - 1)) / gallerySize.count - 26);
  visibleSingles.slice(1).forEach((item) => {
    const column = columnHeights.indexOf(Math.min(...columnHeights));
    const { width, height } = workImageSize(item);
    restWorkColumns[column].push(item);
    // Image plus padding, caption and gap; assign each work to the shortest column.
    columnHeights[column] += imageWidth * height / width + 86;
  });

  const onDetailWheel = (event) => {
    const tile = event.currentTarget?.closest?.(".detail-work-card, .is-detail") || event.currentTarget;
    if (!tile?.classList?.contains("detail-work-card") && !tile?.classList?.contains("is-detail")) return;
    event.preventDefault();
    event.stopPropagation();
    const image = tile.querySelector("img");
    if (!image) return;
    const maxScroll = Math.max(0, image.getBoundingClientRect().height - tile.clientHeight - 6);
    if (maxScroll <= 0) return;
    const current = Number(tile.dataset.scroll || 0);
    const next = Math.max(0, Math.min(maxScroll, current + event.deltaY));
    tile.dataset.scroll = String(next);
    tile.style.setProperty("--detail-y", `${next}px`);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      const tile = event.target?.closest?.(".detail-work-card");
      if (!tile) return;
      event.preventDefault();
      event.stopPropagation();
      const image = tile.querySelector("img");
      if (!image) return;
      const maxScroll = Math.max(0, image.getBoundingClientRect().height - tile.clientHeight - 6);
      const current = Number(tile.dataset.scroll || 0);
      const next = Math.max(0, Math.min(maxScroll, current + event.deltaY));
      tile.dataset.scroll = String(next);
      tile.style.setProperty("--detail-y", `${next}px`);
    };
    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => document.removeEventListener("wheel", handleWheel, { capture: true });
  }, []);

  return (
    <section className="section works" id="works">
      <SectionHead eyebrow="SELECTED WORKS" title="效果图作品展示" software="Blender · Ps · Ai · ComfyUI · LibTV" />
      <div className="work-layout">
        <div className="work-subhead" data-reveal>
          <span>01 / Visual Output</span>
        </div>
        <div className="single-work-wrap" id="single-work-gallery">
        <div className="single-work-grid">
          <button className="single-work-card is-featured" key={featuredWork.src} onClick={() => onPreview(optimizedAsset(featuredWork.src))} data-reveal data-tilt>
            <img src={optimizedAsset(featuredWork.src)} alt={`${featuredWork.title} 1`} loading="lazy" decoding="async" fetchPriority="low" />
            <span>{featuredWork.title}</span>
          </button>
          <div className="single-work-columns" ref={columnsRef} style={{ gridTemplateColumns: `repeat(${gallerySize.count}, minmax(0, 1fr))` }}>
            {restWorkColumns.map((column, columnIndex) => (
              <div className="single-work-column" key={`work-column-${columnIndex}`}>
                {column.map((item, index) => (
                  <button className={`single-work-card single-${((columnIndex + index) % 6) + 1}`} key={item.src} onClick={() => onPreview(optimizedAsset(item.src))} data-reveal data-tilt>
                    <WorkImage item={item} />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>
        <button className={`work-expand ${showAllWorks ? "is-expanded" : ""}`} type="button" aria-expanded={showAllWorks} aria-controls="single-work-gallery" onClick={() => setShowAllWorks((value) => !value)} data-reveal>
          <span>{showAllWorks ? "收起作品" : "展开全部作品"}</span>
          <i />
        </button>

        <div className="work-subhead detail-head" data-reveal>
          <span>02 / Detail Pages</span>
        </div>
        <div className="detail-work-grid">
          {detailWorks.map((item, index) => (
          <button className="detail-work-card" key={item.src} onClick={() => onPreview(optimizedAsset(item.src))} onWheelCapture={onDetailWheel} data-reveal data-tilt>
            <img src={optimizedAsset(item.src)} alt={`${item.title} ${index + 1}`} loading="lazy" decoding="async" fetchPriority="low" />
            <span>{item.title}</span>
          </button>
          ))}
        </div>
        <ProductVideos />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-inner" data-reveal>
        <p>Skillora-L / Brand Visual Director × AI Workflow Architect</p>
        <h2>让品牌内容更快、更准、更有辨识度。</h2>
        <div>
          <a href="mailto:2424619121@qq.com">2424619121@qq.com</a>
          <a href="tel:16680458050">16680458050</a>
        </div>
      </div>
    </section>
  );
}

function Lightbox({ src, onClose }) {
  const croppedWork = [...workSingles, ...detailWorks].find((item) => item.crop && optimizedAsset(item.src) === src);
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <button className="lightbox" onClick={onClose} aria-label="关闭大图">
      {croppedWork ? <WorkImage item={croppedWork} preview /> : <img src={src} alt="作品大图预览" decoding="async" />}
    </button>
  );
}

function App() {
  const [preview, setPreview] = useState(null);
  useReveal();
  usePointer();

  return (
    <>
      <main>
        <Hero onPreview={setPreview} />
        <About />
        <Strengths />
        <Projects />
        <Works onPreview={setPreview} />
        <Contact />
      </main>
      {preview && <Lightbox src={preview} onClose={() => setPreview(null)} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
