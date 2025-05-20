document.addEventListener("DOMContentLoaded", () => {
    // 导航栏滚动效果
    setupNavbarScroll()
  
    // 设置返回顶部按钮
    setupBackToTop()
  
    // 设置滚动动画
    setupScrollAnimations()
  
    // 留言板功能
    setupMessageBoard()
  
    // 设置视差滚动效果
    setupParallax()
  
    // 移动端菜单
    setupMobileMenu()
  })
  
  // 导航栏滚动效果
  function setupNavbarScroll() {
    const header = document.getElementById("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
  
  // 设置移动端菜单
  function setupMobileMenu() {
    const mobileMenu = document.querySelector(".mobile-menu")
    const navLinks = document.querySelector(".nav-links")
  
    if (mobileMenu) {
      mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        mobileMenu.classList.toggle("active")
  
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.innerHTML = '<i class="fas fa-times"></i>'
        } else {
          mobileMenu.innerHTML = '<i class="fas fa-bars"></i>'
        }
      })
    }
  }
  
  // 设置返回顶部按钮
  function setupBackToTop() {
    const backToTopButton = document.getElementById("back-to-top")
  
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("visible")
        } else {
          backToTopButton.classList.remove("visible")
        }
      })
  
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }
  
  // 设置滚动动画
  function setupScrollAnimations() {
    // 添加动画类到主要元素
    const animatedElements = document.querySelectorAll(".animate-fadeIn")
  
    // 观察元素进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running"
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
  
    // 观察所有带有动画类的元素
    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }
  
  // 设置视差滚动效果
  function setupParallax() {
    const parallaxBgs = document.querySelectorAll(".parallax-bg")
  
    window.addEventListener("scroll", () => {
      parallaxBgs.forEach((bg) => {
        const section = bg.closest(".parallax-section")
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const scrollPosition = window.pageYOffset
  
        // 计算视差效果
        if (scrollPosition >= sectionTop - window.innerHeight && scrollPosition <= sectionTop + sectionHeight) {
          const yPos = (scrollPosition - sectionTop) * 0.5
          bg.style.transform = `translate3d(0, ${yPos}px, 0)`
        }
      })
    })
  }
  
  // 留言板功能
  function setupMessageBoard() {
    // 获取DOM元素
    const messageForm = document.getElementById("contact-form")
    const messageBoard = document.getElementById("message-board")
  
    // 从本地存储加载留言
    loadMessages()
  
    // 表单提交事件
    if (messageForm) {
      messageForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // 获取表单数据
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // 创建新留言对象
        const newMessage = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          date: new Date().toLocaleString("zh-CN"),
        }
  
        // 保存留言到本地存储
        saveMessage(newMessage)
  
        // 清空"暂无留言"提示
        if (messageBoard && messageBoard.querySelector(".fst-italic")) {
          messageBoard.innerHTML = ""
        }
        
        // 显示留言
        displayMessage(newMessage)
  
        // 重置表单
        messageForm.reset()
  
        // 显示成功提示
        alert("留言已成功提交！")
      })
    }
  
    // 保存留言到本地存储
    function saveMessage(message) {
      let messages = []
      try {
        const storedMessages = localStorage.getItem("oceanworld-messages")
        if (storedMessages) {
          messages = JSON.parse(storedMessages)
        }
      } catch (e) {
        console.error("读取留言失败:", e)
        messages = []
      }
      
      messages.push(message)
      localStorage.setItem("oceanworld-messages", JSON.stringify(messages))
    }
  
    // 从本地存储加载留言
    function loadMessages() {
      if (!messageBoard) return
  
      let messages = []
      try {
        const storedMessages = localStorage.getItem("oceanworld-messages")
        if (storedMessages) {
          messages = JSON.parse(storedMessages)
        }
      } catch (e) {
        console.error("解析留言失败:", e)
        messages = []
      }
  
      // 清空留言板
      messageBoard.innerHTML = ""
  
      if (messages.length === 0) {
        messageBoard.innerHTML = '<div class="text-center text-gray-400 fst-italic">暂无留言</div>'
        return
      }
  
      // 显示所有留言，最新的在前面
      messages.reverse().forEach((message, index) => {
        displayMessage(message, index)
      })
    }
  
    // 显示单条留言
    function displayMessage(message, index = 0) {
      if (!messageBoard) return
  
      // 创建留言元素
      const messageElement = document.createElement("div")
      messageElement.className = "message-card animate-fadeIn"
      messageElement.style.animationDelay = `${index * 0.1}s`
      messageElement.style.animationPlayState = "running" // 确保动画播放
  
      messageElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h3 class="fw-bold text-blue-300">${message.subject}</h3>
            <p class="small text-gray-400">由 ${message.name} 发布于 ${message.date}</p>
          </div>
        </div>
        <p class="text-gray-300">${message.message}</p>
      `
  
      // 将新留言添加到留言板顶部
      messageBoard.insertBefore(messageElement, messageBoard.firstChild)
    }
  }
  