/* ===============================
   MOBILE NAVIGATION
================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ===============================
   NAVBAR SHADOW ON SCROLL
================================ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow =
    window.scrollY > 50
      ? '0 2px 30px rgba(6, 21, 51, 0.15)'
      : '0 2px 20px rgba(6, 21, 51, 0.1)';
});

/* ===============================
   EMAIL JS INIT
================================ */
(function () {
  if (window.emailjs) {
    emailjs.init("pH2IhkEoGKm5Y86T8");
  }
})();

/* ===============================
   CONTACT FORM
================================ */
const contactForm = document.querySelector('.contact-form-new');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!firstName || !lastName || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const submitBtn = contactForm.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    const templateParams = {
      name: 'Nathewave Nexgen',
      from_name: `${firstName} ${lastName}`,
      message: `Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message: ${message}`
    };

    emailjs.send('service_3o6olpv', 'template_cdgxp1h', templateParams)
      .then(() => {
        alert('Message sent successfully!');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      })
      .catch(() => {
        alert('Failed to send message.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

/* ===============================
   CAREER TABS
================================ */
document.querySelectorAll('.career-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.career-tab, .career-tab-content')
      .forEach(el => el.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

/* ===============================
   DROPDOWN
================================ */
const subjectDropdown = document.getElementById('subjectDropdown');
const subjectSelected = document.getElementById('subjectSelected');
const subjectOptions = document.getElementById('subjectOptions');
const subjectInput = document.getElementById('subject');

if (subjectDropdown) {
  subjectSelected.addEventListener('click', () => {
    subjectOptions.classList.toggle('show');
  });

  document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {
      subjectSelected.textContent = option.textContent;
      subjectInput.value = option.dataset.value;
      subjectOptions.classList.remove('show');
    });
  });
}

/* ===============================
   ✅ FINAL SCROLL REVEAL (SERVICES)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  // Fallback
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealElements.forEach(el => observer.observe(el));
});
