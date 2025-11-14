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
        const slides = document.querySelectorAll('.reveal .slides section');
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

        // create offscreen wrapper (positioned off-screen but visible) so html2canvas can render it reliably
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.left = '-9999px';
        wrapper.style.top = '0';
        wrapper.style.zIndex = '12000';
        wrapper.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || '#ffffff';
        wrapper.style.padding = '20px';
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.pointerEvents = 'none';
        wrapper.style.visibility = 'visible';
        document.body.appendChild(wrapper);

        try {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                showToast('PDF export library not available.');
                wrapper.remove();
                return;
            }

            let pdf = null;
            // choose a high but reasonable scale for quality (can be adjusted)
            const scale = Math.max(1, Math.min(3, (window.devicePixelRatio || 1) * 1.8));

            // helper to wait for images inside element
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

            for (let i = 0; i < slides.length; i++) {
                if (canceled) break;
                const slide = slides[i];
                const clone = slide.cloneNode(true);

                // Ensure the clone has full width so html2canvas can capture it correctly
                const rect = slide.getBoundingClientRect();
                clone.style.width = rect.width + 'px';
                clone.style.height = rect.height + 'px';
                clone.style.boxSizing = 'border-box';

                wrapper.innerHTML = '';
                wrapper.appendChild(clone);

                // wait for images/fonts to settle
                // eslint-disable-next-line no-await-in-loop
                await waitForImages(clone, 5000);
                // small stabilization delay
                // eslint-disable-next-line no-await-in-loop
                await new Promise(r => setTimeout(r, 220));

                // prepare html2canvas options including explicit width/height
                const targetW = Math.max(clone.scrollWidth, rect.width || 800);
                const targetH = Math.max(clone.scrollHeight, rect.height || 600);

                // eslint-disable-next-line no-await-in-loop
                let canvas = null;
                // try up to 3 times if html2canvas returns a blank/small canvas
                let attempt = 0;
                const maxAttempts = 3;
                while (attempt < maxAttempts && !canceled) {
                    // eslint-disable-next-line no-await-in-loop
                    canvas = await html2canvas(wrapper, {
                        scale,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || null,
                        logging: false,
                        scrollX: 0,
                        scrollY: 0,
                        width: targetW,
                        height: targetH,
                        windowWidth: targetW,
                        windowHeight: targetH
                    });

                    if (canvas && canvas.width > 20 && canvas.height > 20) break;
                    attempt += 1;
                    // small backoff before retry
                    // eslint-disable-next-line no-await-in-loop
                    await new Promise(r => setTimeout(r, 200 + attempt * 200));
                }

                if (canceled) break;

                const imgData = canvas.toDataURL('image/jpeg', 1.0);

                if (!pdf) {
                    pdf = new jsPDF({ orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                } else {
                    pdf.addPage([canvas.width, canvas.height]);
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                }

                // update progress UI
                const pct = Math.round(((i + 1) / slides.length) * 100);
                if (progressBar) progressBar.style.width = pct + '%';
                if (progressLabel) progressLabel.textContent = `Rendering slide ${i + 1} of ${slides.length} (${pct}%)`;

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
            wrapper.remove();
            if (progressWrap) progressWrap.setAttribute('aria-hidden', 'true');
            if (cancelBtn) { cancelBtn.style.display = 'none'; cancelBtn.removeEventListener('click', onCancel); }
            exportButtons.forEach(b => b && (b.disabled = false));
            if (!canceled) hideModal();
        }
    }
});
