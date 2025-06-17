  // Deep Sea Canvas Animation (高性能优化版本)
  const canvas = document.getElementById("deepSeaCanvas");
  const c = canvas.getContext("2d");
  let animationId;

  // 性能优化配置
  const cfg = {
      numParticles: 1500,  // 大幅减少粒子数量 (从8000减到1500)
      focalLength: canvas.width * 2,
      speed: 0.8,
      maxParticleSize: 3,
      fadeStartZ: 200,
      fadeEndZ: 100
  };

  let particles = [], cx, cy;
  let lastTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  // 简化粒子类型，减少计算
  const particleTypes = [
      { color: [0, 255, 255], glow: true },      // 青色
      { color: [102, 204, 255], glow: false },   // 蓝色
      { color: [0, 204, 170], glow: false },     // 绿蓝色
  ];

  // 初始化粒子
  function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;

      particles = Array.from({ length: cfg.numParticles }, () => {
          const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
          return {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              z: Math.random() * canvas.width,
              o: Math.random() * 0.6 + 0.3,
              type: type,
              pulse: Math.random() * Math.PI * 2,
              drift: (Math.random() - 0.5) * 0.2
          };
      });
  }

  // 简化透视投影
  function pos(x, y, z) {
      const scale = cfg.focalLength / z;
      return {
          x: (x - cx) * scale + cx,
          y: (y - cy) * scale + cy,
          size: Math.min(cfg.maxParticleSize, scale * 0.8)
      };
  }

  // 简化透明度计算
  function alpha(z, baseAlpha) {
      return z <= cfg.fadeStartZ ? 
          Math.max(0, (z - cfg.fadeEndZ) / (cfg.fadeStartZ - cfg.fadeEndZ) * baseAlpha) : 
          baseAlpha;
  }

  // 优化粒子更新
  function move() {
      for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          
          particle.z -= cfg.speed;
          particle.x += particle.drift;
          particle.y += Math.sin(particle.pulse) * 0.1;
          particle.pulse += 0.01;
          
          if (particle.z <= cfg.fadeEndZ) {
              particle.z = canvas.width;
              particle.x = Math.random() * canvas.width;
              particle.y = Math.random() * canvas.height;
          }
      }
  }

  // 优化渲染
  function draw() {
      // 检查画布尺寸
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          init();
          return;
      }

      // 简化背景
      const gradient = c.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#001122");
      gradient.addColorStop(0.5, "#002244");
      gradient.addColorStop(1, "#003366");
      
      c.fillStyle = gradient;
      c.fillRect(0, 0, canvas.width, canvas.height);

      // 批量渲染粒子
      for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          const curr = pos(particle.x, particle.y, particle.z);
          const a = alpha(particle.z, particle.o);
          
          if (a <= 0.05 || curr.size < 0.5) continue; // 跳过几乎不可见的粒子

          const [r, g, b] = particle.type.color;
          
          c.beginPath();
          c.arc(curr.x, curr.y, curr.size, 0, Math.PI * 2);
          
          // 简化发光效果
          if (particle.type.glow) {
              c.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
              c.shadowBlur = curr.size * 2;
          } else {
              c.shadowBlur = 0;
          }
          
          c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          c.fill();
      }
  }

  // 帧率控制的动画循环
  function loop(currentTime) {
      animationId = requestAnimationFrame(loop);
      
      if (currentTime - lastTime >= frameInterval) {
          move();
          draw();
          lastTime = currentTime;
      }
  }

  // 页面可见性API优化
  document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
          if (animationId) {
              cancelAnimationFrame(animationId);
          }
      } else {
          loop(performance.now());
      }
  });

  // 页面功能
  function setupScrollAnimations() {
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, observerOptions);

      document.querySelectorAll('.fade-in').forEach(el => {
          observer.observe(el);
      });
  }

  function setupScrollIndicator() {
      let ticking = false;
      
      window.addEventListener('scroll', () => {
          if (!ticking) {
              requestAnimationFrame(() => {
                  const scrollTop = window.pageYOffset;
                  const docHeight = document.body.scrollHeight - window.innerHeight;
                  const scrollPercent = (scrollTop / docHeight) * 100;
                  
                  document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
                  
                  const header = document.getElementById('header');
                  if (scrollTop > 100) {
                      header.classList.add('scrolled');
                  } else {
                      header.classList.remove('scrolled');
                  }
                  
                  ticking = false;
              });
              ticking = true;
          }
      });
  }

  function bookExhibition(exhibitionName) {
      alert(`🎫 预订展览: ${exhibitionName}\n\n📅 请选择参观日期和时间：\n• 上午场: 9:00-12:00\n• 下午场: 13:00-17:00\n• 夜场: 18:00-21:00 (周末限定)\n\n👥 请选择参观人数和票型\n\n💡 预订功能开发中，敬请期待！\n\n📞 暂时请致电 400-888-0000 人工预订`);
  }

  function showQuickInfo() {
      alert(`🐠 快速导览\n\n🗺️ 场馆分布：\n• 1F: 热带鱼展区、珊瑚礁区\n• 2F: 深海生物区、鲨鱼馆\n• 3F: 海豚表演区、互动体验区\n• B1: 海龟保护区、科普教育区\n\n🕒 表演时间：\n• 海豚表演: 10:30, 14:30, 16:30\n• 喂食表演: 11:00, 15:00\n• 科普讲座: 13:00, 17:00\n\n🎫 今日剩余票量充足，欢迎现场购票！`);
  }

  // Initialize AOS
  AOS.init({
      duration: 800,
      once: true,
      offset: 100
  });

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
      init();
      loop(performance.now());
      setupScrollAnimations();
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // 页面加载动画
  window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 1s ease-in-out';
      setTimeout(() => {
          document.body.style.opacity = '1';
      }, 100);
  });

  function bookActivity(activityName) {
      alert(`🎮 预约活动: ${activityName}\n\n📋 预约须知：\n• 请提前24小时预约\n• 活动当天请提前15分钟到达\n• 部分活动有年龄限制\n• 请穿着舒适服装\n\n💡 预约系统开发中，敬请期待！\n\n📞 暂时请致电 400-888-0000 人工预约`);
  }

  function joinMembership() {
      alert(`👑 加入VIP会员\n\n🎁 会员权益包括：\n• 全年无限次免费参观\n• 专属导览和活动\n• 生日特别礼遇\n• 优先预约权\n• 会员专属商品折扣\n\n💰 会员费用：\n• 个人年卡：¥588\n• 家庭套餐：¥888 (2大2小)\n• 学生优惠：¥388 (需学生证)\n\n📱 会员系统开发中，敬请期待！\n\n🏪 暂时请到售票处办理会员卡`);
  }
  // 互动照片菱形相册交互效果
  document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.box').forEach(function (wrapper) {
          // 当鼠标在box上移动时，计算偏移量，并更新图片位置 
          wrapper.addEventListener('mousemove', function (e) {
              // 获取当前box的尺寸和位置 
              const rect = wrapper.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              const img = wrapper.querySelector('img');
              // 根据鼠标位置，动态更新图片的平移和缩放效果 
              img.style.transform = `rotate(0deg) translate3d(${x * -0.5}px, ${y * -0.5}px, 0) scale(1.6)`;
          });
          // 当鼠标离开时，恢复图片原来的旋转和位置 
          wrapper.addEventListener('mouseleave', function () {
              const img = wrapper.querySelector('img');
              img.style.transform = 'rotate(-45deg) scale(1.5)';
          });
      });
  });

  // 导航栏滚动效果
  window.addEventListener('scroll', function () {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });