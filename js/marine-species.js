// 导航栏滚动效果
window.addEventListener("scroll", () => {
    const header = document.getElementById("header")
  
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
})
  
// 移动端菜单
const mobileMenu = document.querySelector(".mobile-menu")
const navLinks = document.querySelector(".nav-links")
  
mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active")
  mobileMenu.classList.toggle("active")

  if (mobileMenu.classList.contains("active")) {
    mobileMenu.innerHTML = '<i class="fas fa-times"></i>'
  } else {
    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>'
  }
})
  
// 百叶窗效果
const blinds = document.querySelectorAll(".blind")
  
blinds.forEach((blind) => {
  blind.addEventListener("click", function () {
    // 移除所有百叶窗的active类
    blinds.forEach((b) => b.classList.remove("active"))
    // 给当前点击的百叶窗添加active类
    this.classList.add("active")
  })
})
  
// 详情页导航
const detailNavLinks = document.querySelectorAll(".detail-nav-link")
const detailSections = document.querySelectorAll(".detail-section-content")
  
detailNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const sectionId = this.getAttribute("data-section")

    // 移除所有导航链接的active类
    detailNavLinks.forEach((l) => l.classList.remove("active"))
    // 给当前点击的导航链接添加active类
    this.classList.add("active")

    // 隐藏所有内容区域
    detailSections.forEach((section) => section.classList.remove("active"))
    // 显示对应的内容区域
    document.getElementById(sectionId).classList.add("active")
  })
})
  
// 添加卡片翻转交互
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".exploration-card")

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped")
    })
  })

  // 探索更多按钮点击事件
  const exploreMoreBtn = document.querySelector(".explore-more-btn")
  if (exploreMoreBtn) {
    exploreMoreBtn.addEventListener("click", () => {
      // 这里可以添加加载更多卡片的逻辑
      // 或者跳转到更详细的页面
      window.location.href = "marine-species-full.html"
    })
  }
})
  