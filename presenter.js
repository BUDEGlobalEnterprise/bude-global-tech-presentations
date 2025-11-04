// Render slides
        async function renderSlides(data) {
            const slidesContainer = document.querySelector('.reveal .slides');
            slidesContainer.innerHTML = '';

            data.presentation.topics.forEach(topic => {
                topic.slides.forEach(slide => {
                    const section = createSlide(slide);
                    slidesContainer.appendChild(section);
                });
            });

            // Initialize Reveal.js
            Reveal.initialize({
                hash: true,
                slideNumber: true,
                transition: 'slide',
                backgroundTransition: 'fade',
                controls: true,
                progress: true,
                center: true,
                width: 1280,
                height: 720,
                margin: 0.1,
                minScale: 0.2,
                maxScale: 2.0,
                overflow: 'scroll',
                keyboard: {
                    40: () => {
                        const currentSlide = document.querySelector('.reveal .slides section.present');
                        if (currentSlide && currentSlide.scrollHeight > currentSlide.clientHeight) {
                            const isAtBottom = currentSlide.scrollTop + currentSlide.clientHeight >= currentSlide.scrollHeight - 5;
                            if (!isAtBottom) {
                                currentSlide.scrollTop += 50;
                                return false;
                            }
                        }
                        Reveal.down();
                    },
                    38: () => {
                        const currentSlide = document.querySelector('.reveal .slides section.present');
                        if (currentSlide && currentSlide.scrollHeight > currentSlide.clientHeight) {
                            const isAtTop = currentSlide.scrollTop <= 5;
                            if (!isAtTop) {
                                currentSlide.scrollTop -= 50;
                                return false;
                            }
                        }
                        Reveal.up();
                    },
                    72: () => { // 'H' key to go back to home
                        if (confirm('Return to presentation selector?')) {
                            location.reload();
                        }
                    }
                }
            });

            // Hide watermark on center slides
            Reveal.on('slidechanged', event => {
                if (event.currentSlide.classList.contains('center')) {
                    document.body.classList.add('hide-watermark');
                } else {
                    document.body.classList.remove('hide-watermark');
                }
            });

            const initialSlide = document.querySelector('.reveal .slides section.present');
            if (initialSlide && initialSlide.classList.contains('center')) {
                document.body.classList.add('hide-watermark');
            }
        }

        function createSlide(slideData) {
            const section = document.createElement('section');

            if (slideData.type === 'title') {
                section.classList.add('center', 'gradient-bg');
                section.innerHTML = `
                    <center><img src="assets/images/budeglobal_logo.png" alt="BUDE Logo" class="bude-logo"></center>
                    <h1 style="font-size: 3em; margin: 0.5em 0;">${slideData.title}</h1>
                    <h3 style="color: var(--bude-primary); font-size: 1.4em; margin: 0.5em 0;">${slideData.subtitle}</h3>
                `;
            } else if (slideData.type === 'presenter') {
                section.classList.add('center', 'gradient-bg');
                section.innerHTML = `
                <div style="display: flex; align-items: center; gap: 3em; max-width: 900px;">
                    <div style="flex-shrink: 0;">
                        <div
                            style="width: 250px; height: 250px; border-radius: 50%; background: linear-gradient(135deg, var(--bude-primary), var(--bude-purple)); display: flex; align-items: center; justify-content: center; color: white; font-size: 4em; font-weight: bold; border: 5px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                            APG
                        </div>
                    </div>
                    <div style="text-align: left;">
                        <h2 style="margin: 0 0 0.5em 0; font-size: 2.5em;">${slideData.name}</h2>
                        <div style="font-size: 1.1em; line-height: 1.8;">
                            <p style="margin: 0.5em 0;">
                                <span class="emoji">👔</span> ${slideData.title}
                            </p>
                            <p style="margin: 0.5em 0;">
                                <span class="emoji">💻</span> ${slideData.experience}
                            </p>
                            <p style="margin: 0.5em 0;">
                                <span class="emoji">🌟</span> ${slideData.oss_experience}
                            </p>
                            <p style="margin: 1em 0 0.3em 0;">
                                <span class="emoji">🔗</span> <a href="${slideData.github}"
                                    target="_blank"
                                    style="color: var(--bude-purple);">github.com/aravind-govindhasamy</a>
                            </p>
                            <p style="margin: 0.3em 0;">
                                <span class="emoji">🌐</span> <a href="${slideData.website}"
                                    target="_blank"
                                    style="color: var(--bude-purple);">aravind-govindhasamy.github.io</a>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            } else if (slideData.type === 'topic-title') {
                section.classList.add('center');
                section.innerHTML = `
                    <h2>${slideData.title}</h2>
                    ${slideData.box ? createBox(slideData.box) : ''}
                    ${slideData.note ? `<p class="small-text" style="margin-top: ${slideData.note.centered ? '2em; text-align: center' : '1.5em'};">${slideData.note.text}</p>` : ''}
                `;
            } else if (slideData.type === 'content') {
                const emoji = slideData.emoji ? `<span class="emoji">${slideData.emoji}</span> ` : '';
                section.innerHTML = `
                    <h3>${emoji}${slideData.title}</h3>
                    ${slideData.box ? createBox(slideData.box) : ''}
                    ${slideData.list ? createList(slideData.list) : ''}
                    ${slideData.note ? `<p class="small-text" style="margin-top: 1.5em;">${slideData.note.text}</p>` : ''}
                `;
            } else if (slideData.type === 'qa') {
                section.classList.add('center', 'gradient-bg');
                section.innerHTML = `
                    <h1>${slideData.title}</h1>
                    <p style="margin-top: 1.5em; font-size: 1.2em; color: var(--bude-text-dark);">
                        ${slideData.content}
                    </p>
                `;
            } else if (slideData.type === 'thank-you') {
                section.classList.add('center', 'gradient-bg');
                section.innerHTML = `
                    <h1>${slideData.title}</h1>
                    <div class="box" style="margin-top: 2em; max-width: 800px; margin-left: auto; margin-right: auto;">
                        <p style="font-size: 1.1em; margin-bottom: 1em;">
                            ${slideData.box.content}
                        </p>
                        <p class="small-text" style="margin-top: 1em;">
                            ${slideData.box.note}
                        </p>
                    </div>
                    <div style="margin-top: 2em;">
                        <p style="font-size: 1.2em;">
                            <span class="emoji"></span> <strong style="color: var(--bude-primary);">${slideData.footer.org}</strong>
                        </p>
                        <p style="margin-top: 0.5em; color: var(--bude-purple);">
                            ${slideData.footer.tagline}
                        </p>
                    </div>
                `;
            }

            return section;
        }

        function createBox(boxData) {
            let html = '<div class="box">';

            if (boxData.title) {
                html += `<p><strong>${boxData.title}</strong></p>`;
            }

            if (boxData.content) {
                html += `<p>${boxData.content}</p>`;
            }

            if (boxData.list) {
                if (Array.isArray(boxData.list)) {
                    html += '<ul>';
                    boxData.list.forEach(item => {
                        if (typeof item === 'object' && item.emoji) {
                            html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
                        } else {
                            html += `<li>${item}</li>`;
                        }
                    });
                    html += '</ul>';
                }
            }

            html += '</div>';
            return html;
        }

        function createList(listData) {
            let html = '<ul style="margin-top: 1.5em;">';

            listData.forEach(item => {
                if (typeof item === 'object' && item.emoji) {
                    html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
                } else {
                    html += `<li>${item}</li>`;
                }
            });

            html += '</ul>';
            return html;
        }