const collectBrowserInfo = () => {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        appVersion: navigator.appVersion
    };

    localStorage.setItem('browserInfo', JSON.stringify(info));

    displayBrowserInfo();
};

const displayBrowserInfo = () => {
    const infoStr = localStorage.getItem('browserInfo');
    if (infoStr) {
        const info = JSON.parse(infoStr);
        const footerInfo = document.getElementById('browser-info');

        if (footerInfo) {
            footerInfo.innerHTML = `
                <p><strong>Інформація про систему:</strong></p>
                <p>User Agent: ${info.userAgent}</p>
                <p>Платформа: ${info.platform}</p>
                <p>Мова: ${info.language}</p>
                <p>Версія додатку: ${info.appVersion}</p>
            `;
        }
    }
};


const fetchComments = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/17/comments');
        const comments = await response.json();

        const reviewsContainer = document.getElementById('reviews-container');
        if (!reviewsContainer) return;
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('card');

            commentEl.innerHTML = `
                <h3>${comment.name}</h3>
                <p><em>${comment.email}</em></p>
                <br>
                <p>${comment.body}</p>
            `;

            reviewsContainer.appendChild(commentEl);
        });

    } catch (error) {
        console.error('Помилка завантаження відгуків:', error);
        const reviewsContainer = document.getElementById('reviews-container');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '<p>Не вдалося завантажити відгуки.</p>';
        }
    }
};


const setupModal = () => {
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close-btn');

    setTimeout(() => {
        if (modal) {
            modal.style.display = 'block';
        }
    }, 60000);

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};


const setupTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    let savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
        const currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 21) {
            savedTheme = 'light';
        } else {
            savedTheme = 'dark';
        }
    }

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.textContent = '🌙';
        }
    };

    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        let newTheme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
};


document.addEventListener('DOMContentLoaded', () => {
    collectBrowserInfo();
    fetchComments();
    setupModal();
    setupTheme();
});
