const toastEl = document.querySelector('.toast');
                if (toastEl) {
                    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
                    toast.show();
                }