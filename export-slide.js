// Export current Reveal.js slide to PDF using html2canvas + jsPDF
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('export-pdf');
    const modal = document.getElementById('export-modal');
    const exportCurrentBtn = document.getElementById('export-current');
    const exportDeckBtn = document.getElementById('export-deck');
    const closeBtn = document.getElementById('export-close');
    const toastContainer = document.getElementById('toast-container');

    if (!btn) return;

    function showModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
    }

    function hideModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
    }

    function showToast(message, timeout = 3500) {
        if (!toastContainer) return;
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = message;
        toastContainer.appendChild(t);
        // force reflow to enable transition
        void t.offsetWidth;
        t.classList.add('show');
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 300);
        }, timeout);
    }

    async function exportCurrentSlide() {
        const slide = document.querySelector('.reveal .slides section.present');
        if (!slide) {
            showToast('No active slide to export.');
            return;
        }

        // Clone slide to avoid modifications and position issues
        const clone = slide.cloneNode(true);
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.left = '-9999px';
        wrapper.style.top = '0';
        wrapper.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || '#ffffff';
        wrapper.style.padding = '40px';
        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        try {
            // Wait briefly for fonts/images
            await new Promise(r => setTimeout(r, 120));

            const scale = Math.min(2, window.devicePixelRatio || 1);
            const canvas = await html2canvas(wrapper, {
                scale: scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                showToast('PDF export library not available.');
                return;
            }

            const pdf = new jsPDF({ orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);

            const filename = `slide-${(new Date()).toISOString().replace(/[:\.]/g,'-')}.pdf`;
            pdf.save(filename);
            showToast('Slide exported as PDF');
        } catch (err) {
            console.error('Error exporting slide:', err);
            showToast('Failed to export slide');
        } finally {
            wrapper.remove();
            hideModal();
        }
    }

    function exportWholeDeck() {
        // Use Reveal's print-pdf mode: open deck in new tab with ?print-pdf and let user print to PDF
        const url = new URL(window.location.href);
        // ensure parameter present
        url.searchParams.set('print-pdf', '');
        const target = url.toString();
        window.open(target, '_blank');
        showToast('Opened print view for whole deck — use browser Print to save as PDF');
        hideModal();
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });

    if (exportCurrentBtn) exportCurrentBtn.addEventListener('click', exportCurrentSlide);
    if (exportDeckBtn) exportDeckBtn.addEventListener('click', exportWholeDeck);
    const exportDeckAutoBtn = document.getElementById('export-deck-auto');
    if (exportDeckAutoBtn) exportDeckAutoBtn.addEventListener('click', exportWholeDeckAuto);
    if (closeBtn) closeBtn.addEventListener('click', hideModal);

    // close modal on esc
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') hideModal();
    });
    
    async function exportWholeDeckAuto() {
        // Build a mapping of slides to Reveal horizontal/vertical indices
        const hSections = document.querySelectorAll('.reveal .slides > section');
        const mapping = [];
        hSections.forEach((hEl, hIdx) => {
            const vSections = hEl.querySelectorAll(':scope > section');
            if (vSections.length) {
                vSections.forEach((vEl, vIdx) => mapping.push({ el: vEl, h: hIdx, v: vIdx }));
            } else {
                mapping.push({ el: hEl, h: hIdx, v: 0 });
            }
        });

        const slides = mapping.map(m => m.el);
        if (!slides || slides.length === 0) {
            showToast('No slides found to export');
            return;
        }
        // Prepare progress UI and cancel
        const progressBar = document.getElementById('export-progress-bar');
        const progressLabel = document.getElementById('export-progress-label');
        const progressWrap = document.getElementById('export-progress');
        const cancelBtn = document.getElementById('export-cancel');
        const exportButtons = document.querySelectorAll('#export-current, #export-deck, #export-deck-auto');

        let canceled = false;
        function onCancel() { canceled = true; showToast('Export cancelled'); }

        if (progressWrap) progressWrap.setAttribute('aria-hidden', 'false');
        if (cancelBtn) { cancelBtn.style.display = 'inline-block'; cancelBtn.addEventListener('click', onCancel); }
        exportButtons.forEach(b => b && (b.disabled = true));

        // We'll capture the visible slide on-screen to avoid off-screen/html2canvas issues.
        // Add an 'exporting' class so CSS can hide chrome while we capture.
        document.documentElement.classList.add('exporting');
        document.body.classList.add('exporting');

        // Prepare to temporarily make the reveal container occupy the viewport (visual fullscreen)
        let revealEl = document.querySelector('.reveal');
        let revealPrev = null;
        if (revealEl) {
            revealPrev = {
                position: revealEl.style.position || '',
                left: revealEl.style.left || '',
                top: revealEl.style.top || '',
                width: revealEl.style.width || '',
                height: revealEl.style.height || '',
                zIndex: revealEl.style.zIndex || '',
                margin: revealEl.style.margin || '',
                padding: revealEl.style.padding || '',
                boxSizing: revealEl.style.boxSizing || ''
            };

            revealEl.style.position = 'fixed';
            revealEl.style.left = '0';
            revealEl.style.top = '0';
            revealEl.style.width = '100vw';
            revealEl.style.height = '100vh';
            revealEl.style.zIndex = '2147483646';
            revealEl.style.margin = '0';
            revealEl.style.padding = '0';
            revealEl.style.boxSizing = 'border-box';

            // Ask Reveal to relayout for the new viewport and give it a moment
            try { Reveal && Reveal.layout && Reveal.layout(); } catch (e) { /* ignore */ }
            // small delay to ensure layout completes before capturing
            // eslint-disable-next-line no-await-in-loop
            await new Promise(r => setTimeout(r, 220));
        }

        try {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                showToast('PDF export library not available.');
                document.body.classList.remove('exporting');
                return;
            }
            // save current indices to restore after export
            const saved = (Reveal && Reveal.getIndices) ? Reveal.getIndices() : null;

            let pdf = null;
            // choose a high but reasonable scale for quality (can be adjusted)
            const scale = Math.max(1, Math.min(3, (window.devicePixelRatio || 1) * 1.6));

            // helper: wait for Reveal slide change event or timeout
            const waitForReveal = (timeout = 800) => new Promise(res => {
                let called = false;
                const handler = () => {
                    if (called) return;
                    called = true;
                    Reveal.off('slidechanged', handler);
                    res();
                };
                Reveal.on('slidechanged', handler);
                setTimeout(() => { if (!called) { called = true; Reveal.off('slidechanged', handler); res(); } }, timeout);
            });

            // Build a mapping of slides to indices (h, v)
            const map = mapping; // previously built

            for (let i = 0; i < map.length; i++) {
                if (canceled) break;
                const entry = map[i];

                // navigate to slide (on-screen) and wait for render
                Reveal.slide(entry.h, entry.v);
                // wait for reveal to render the slide
                // eslint-disable-next-line no-await-in-loop
                await waitForReveal(900);
                // give extra time for images/fonts/animations
                // eslint-disable-next-line no-await-in-loop
                await new Promise(r => setTimeout(r, 300));

                if (canceled) break;

                const visible = document.querySelector('.reveal .slides section.present');
                if (!visible) continue;

                // Wait for images inside visible slide
                const waitForImages = (el, timeout = 4000) => new Promise(res => {
                    const imgs = Array.from(el.querySelectorAll('img'));
                    if (imgs.length === 0) return res();
                    let remaining = imgs.length;
                    const timer = setTimeout(() => res(), timeout);
                    imgs.forEach(img => {
                        if (img.complete) {
                            remaining -= 1;
                            if (remaining === 0) { clearTimeout(timer); res(); }
                        } else {
                            img.addEventListener('load', () => { remaining -= 1; if (remaining === 0) { clearTimeout(timer); res(); } });
                            img.addEventListener('error', () => { remaining -= 1; if (remaining === 0) { clearTimeout(timer); res(); } });
                        }
                    });
                });

                // eslint-disable-next-line no-await-in-loop
                await waitForImages(visible, 5000);

                // capture the visible slide on-screen
                let canvas = null;
                let attempt = 0;
                const maxAttempts = 4;
                while (attempt < maxAttempts && !canceled) {
                    // eslint-disable-next-line no-await-in-loop
                    canvas = await html2canvas(visible, {
                        scale,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || null,
                        logging: false
                    });

                    if (canvas && canvas.width > 20 && canvas.height > 20) break;
                    attempt += 1;
                    // eslint-disable-next-line no-await-in-loop
                    await new Promise(r => setTimeout(r, 250 + attempt * 200));
                }

                if (canceled) break;

                if (!canvas) continue;

                const imgData = canvas.toDataURL('image/jpeg', 1.0);

                if (!pdf) {
                    pdf = new jsPDF({ orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                } else {
                    pdf.addPage([canvas.width, canvas.height]);
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                }

                // update progress UI
                const pct = Math.round(((i + 1) / map.length) * 100);
                if (progressBar) progressBar.style.width = pct + '%';
                if (progressLabel) progressLabel.textContent = `Rendering slide ${i + 1} of ${map.length} (${pct}%)`;

                // short delay so UI updates are visible
                // eslint-disable-next-line no-await-in-loop
                await new Promise(r => setTimeout(r, 120));
            }

            if (!canceled && pdf) {
                const filename = `deck-${(new Date()).toISOString().replace(/[:\.]/g,'-')}.pdf`;
                pdf.save(filename);
                showToast('Whole deck exported as PDF', 5000);
            } else if (canceled) {
                showToast('Export cancelled');
            }
        } catch (err) {
            console.error('Error exporting whole deck:', err);
            showToast('Failed to export deck');
        } finally {
            // restore UI
            document.body.classList.remove('exporting');
            document.documentElement.classList.remove('exporting');
            // restore reveal container inline styles if we modified them
            try {
                if (revealEl && revealPrev) {
                    revealEl.style.position = revealPrev.position;
                    revealEl.style.left = revealPrev.left;
                    revealEl.style.top = revealPrev.top;
                    revealEl.style.width = revealPrev.width;
                    revealEl.style.height = revealPrev.height;
                    revealEl.style.zIndex = revealPrev.zIndex;
                    revealEl.style.margin = revealPrev.margin;
                    revealEl.style.padding = revealPrev.padding;
                    revealEl.style.boxSizing = revealPrev.boxSizing;
                    try { Reveal && Reveal.layout && Reveal.layout(); } catch (e) { /* ignore */ }
                }
            } catch (e) {
                // ignore
            }
            if (progressWrap) progressWrap.setAttribute('aria-hidden', 'true');
            if (cancelBtn) { cancelBtn.style.display = 'none'; cancelBtn.removeEventListener('click', onCancel); }
            exportButtons.forEach(b => b && (b.disabled = false));
            if (!canceled) hideModal();
            // restore saved indices if available
            try {
                if (saved && typeof saved.h === 'number') Reveal.slide(saved.h, saved.v || 0);
            } catch (e) {
                // ignore
            }
        }
    }
});
