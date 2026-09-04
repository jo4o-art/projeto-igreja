document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // CHAVE PIX
    // =========================================

    const pixKey =
        document.getElementById("pixKey");

    const copyButton =
        document.getElementById("copyPix");

    const copyText =
        document.getElementById("copyText");

    const copyIcon =
        document.getElementById("copyIcon");

    const copyMessage =
        document.getElementById("copyMessage");


    // =========================================
    // COPIAR PIX
    // =========================================

    if (copyButton && pixKey) {

        copyButton.addEventListener(
            "click",
            async () => {

                const key =
                    pixKey.textContent.trim();


                try {

                    // Método moderno
                    await navigator.clipboard.writeText(
                        key
                    );


                    showCopied();


                } catch (error) {

                    // Método alternativo
                    fallbackCopy(key);

                }

            }
        );

    }



    // =========================================
    // MOSTRAR CONFIRMAÇÃO
    // =========================================

    function showCopied() {

        copyButton.classList.add(
            "copied"
        );


        copyIcon.textContent = "✓";


        copyText.textContent =
            "CÓDIGO COPIADO!";


        copyMessage.textContent =
            "A chave Pix foi copiada para a área de transferência.";


        setTimeout(() => {

            copyButton.classList.remove(
                "copied"
            );


            copyIcon.textContent = "⧉";


            copyText.textContent =
                "COPIAR CÓDIGO";


            copyMessage.textContent = "";

        }, 2500);

    }



    // =========================================
    // MÉTODO ALTERNATIVO DE CÓPIA
    // =========================================

    function fallbackCopy(text) {

        const textarea =
            document.createElement("textarea");


        textarea.value = text;


        textarea.style.position =
            "fixed";

        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.focus();

        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

            showCopied();

        } catch (error) {

            copyMessage.textContent =
                "Não foi possível copiar automaticamente. Selecione e copie a chave manualmente.";

        }


        document.body.removeChild(
            textarea
        );

    }



    // =========================================
    // ANO AUTOMÁTICO
    // =========================================

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});