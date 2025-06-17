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
  
// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })

      // 关闭移动端菜单
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        mobileMenu.classList.remove("active")
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>'
      }
    }
  })
})
  
// 信息卡片动画
const infoCards = document.querySelectorAll(".info-card")
  
function checkScroll() {
  infoCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (cardTop < windowHeight - 100) {
      card.classList.add("show")
    }
  })
}
  
window.addEventListener("scroll", checkScroll)
window.addEventListener("load", checkScroll)
  
// 游览路线标签页切换
const routeTabs = document.querySelectorAll(".route-tab")
const routeContents = document.querySelectorAll(".route-content")
  
routeTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const routeId = this.getAttribute("data-route")

    routeTabs.forEach((tab) => tab.classList.remove("active"))
    routeContents.forEach((content) => content.classList.remove("active"))

    this.classList.add("active")
    document.getElementById(routeId + "-route").classList.add("active")
  })
})
  
// 票价计算
const quantityInputs = document.querySelectorAll(".quantity-input")
const minusBtns = document.querySelectorAll(".minus-btn")
const plusBtns = document.querySelectorAll(".plus-btn")
const totalPrice = document.querySelector(".total-price")
  
function updateTotal() {
  let total = 0
  quantityInputs.forEach((input) => {
    const price = Number.parseInt(input.getAttribute("data-price"))
    const quantity = Number.parseInt(input.value)
    total += price * quantity
  })
  totalPrice.textContent = "¥" + total
}
  
quantityInputs.forEach((input) => {
  input.addEventListener("change", updateTotal)
})
  
minusBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const ticket = this.getAttribute("data-ticket")
    const input = document.querySelector(`.quantity-input[data-ticket="${ticket}"]`)
    if (Number.parseInt(input.value) > 0) {
      input.value = Number.parseInt(input.value) - 1
      updateTotal()
    }
  })
})
  
plusBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const ticket = this.getAttribute("data-ticket")
    const input = document.querySelector(`.quantity-input[data-ticket="${ticket}"]`)
    if (Number.parseInt(input.value) < Number.parseInt(input.getAttribute("max"))) {
      input.value = Number.parseInt(input.value) + 1
      updateTotal()
    }
  })
})
  
// 支付方式选择
const paymentMethods = document.querySelectorAll(".payment-method")
  
paymentMethods.forEach((method) => {
  method.addEventListener("click", function () {
    paymentMethods.forEach((m) => m.classList.remove("active"))
    this.classList.add("active")
  })
})
  
// 设置日期选择器的最小日期为今天
const today = new Date().toISOString().split("T")[0]
document.getElementById("visit-date").setAttribute("min", today)
document.getElementById("visit-date").value = today
  
// 创建背景粒子效果
function createParticles(containerId, count) {
  const container = document.getElementById(containerId)
  if (!container) return

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // 随机大小
    const size = Math.random() * 10 + 5
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // 随机位置
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // 随机透明度
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString()

    // 添加动画
    particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`
    particle.style.animationDelay = `${Math.random() * 5}s`

    container.appendChild(particle)
  }
}
  
// 创建英雄区背景粒子
createParticles("guide-particles", 30)
  
// 页面加载完成后初始化
window.addEventListener("load", () => {
  // 检查信息卡片动画
  checkScroll()

  // 设置默认日期
  document.getElementById("visit-date").value = today
})
  