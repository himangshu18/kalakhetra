/* =====================================================
   CMP Chatbot Widget — dummy Q&A logic
   Drop this file at: assets/js/chatbot-widget.js
   No backend / no API calls — purely canned responses.
   ===================================================== */

(function () {
    "use strict";

    // ---------- Dummy knowledge base ----------
    // Each entry: keywords (lowercase) -> reply (can include \n for line breaks)
    var KB = [
        {
            keywords: ["hello", "hi", "namaskar", "নমস্কাৰ", "hey"],
            reply: "নমস্কাৰ! 🙏 CMP সহায়ক চেটবটলৈ স্বাগতম। আপুনি প্ৰকল্পৰ বিষয়ে কি জানিব বিচাৰে?"
        },
        {
            keywords: ["what is cmp", "cmp কি", "প্ৰকল্প কি", "about", "আভাস", "overview"],
            reply: "সাংস্কৃতিক মানচিত্ৰণ প্ৰকল্প (CMP) হৈছে অসমৰ সাংস্কৃতিক ঐতিহ্যৰ নথিভুক্তকৰণ, সংৰক্ষণ আৰু প্ৰচাৰৰ এক ডিজিটেল পদক্ষেপ।"
        },
        {
            keywords: ["objective", "উদ্দেশ্য", "goal", "লক্ষ্য"],
            reply: "প্ৰকল্পৰ মূল উদ্দেশ্য হ'ল: ১) ডিজিটেল সংৰক্ষণ ২) স্থানীয় পৰম্পৰাৰ নথিভুক্তকৰণ ৩) সাংস্কৃতিক পৰ্যটনৰ প্ৰচাৰ ৪) গৱেষণা আৰু শিক্ষাৰ সহায়।"
        },
        {
            keywords: ["contact", "যোগাযোগ", "email", "phone", "ফোন"],
            reply: "আমাক যোগাযোগ কৰিব পাৰে:\n📧 culturalmapping.assam@gov.in\n📞 +91-361-2345678"
        },
        {
            keywords: ["team", "গাঠনিক", "structure", "সজ্জা"],
            reply: "প্ৰকল্পৰ গাঠনিক সজ্জাৰ সবিশেষ তথ্য 'সবিশেষ' মেনুৰ অধীনত 'গাঠনিক সজ্জা' পৃষ্ঠাত পাব পাৰিব।"
        },
        {
            keywords: ["resource", "সমল", "archive", "gallery", "video", "photo"],
            reply: "ডিজিটেল আৰ্কাইভত ফটো গেলাৰী, ভিডিঅ' ৰেকৰ্ড, পাণ্ডুলিপি আৰু গৱেষণা প্ৰবন্ধ অন্তৰ্ভুক্ত আছে — ফুটাৰৰ 'Digital Archive' অংশ চাওক।"
        },
        {
            keywords: ["thank", "ধন্যবাদ", "thanks"],
            reply: "আপোনাক ধন্যবাদ! আৰু কিবা সহায় লাগিলে মোক সুধিব। 😊"
        },
        {
            keywords: ["bye", "বিদায়", "exit"],
            reply: "ভাল থাকিব! পুনৰ লগ পাম। 👋"
        }
    ];

    var DEFAULT_REPLY = "ক্ষমা কৰিব, এইটো এটা ডেমো চেটবট আৰু এই প্ৰশ্নটোৰ উত্তৰ মোৰ ওচৰত নাই। অনুগ্ৰহ কৰি তলৰ পৰামৰ্শসমূহৰ কোনোবাটো বাছি লওক অথবা আমাক ইমেইল কৰক।";

    var QUICK_REPLIES = [
        "CMP কি?",
        "উদ্দেশ্য",
        "যোগাযোগ",
        "সমল"
    ];

    function findReply(text) {
        var t = text.toLowerCase();
        for (var i = 0; i < KB.length; i++) {
            var entry = KB[i];
            for (var j = 0; j < entry.keywords.length; j++) {
                if (t.indexOf(entry.keywords[j].toLowerCase()) !== -1) {
                    return entry.reply;
                }
            }
        }
        return DEFAULT_REPLY;
    }

    // ---------- Build DOM ----------
    function buildWidget() {
        var launcher = document.createElement("div");
        launcher.className = "cmp-chat-launcher";
        launcher.id = "cmpChatLauncher";
        launcher.innerHTML =
            '<i class="fas fa-comment-dots cmp-chat-chat-icon"></i>' +
            '<i class="fas fa-times cmp-chat-close-icon"></i>';

        var win = document.createElement("div");
        win.className = "cmp-chat-window";
        win.id = "cmpChatWindow";
        win.innerHTML =
            '<div class="cmp-chat-header">' +
                '<div class="cmp-chat-avatar"><i class="fas fa-landmark"></i></div>' +
                '<div class="cmp-chat-header-text">' +
                    '<div class="cmp-chat-title">CMP সহায়ক চেটবট</div>' +
                    '<div class="cmp-chat-subtitle">Cultural Mapping Assistant (Demo)</div>' +
                '</div>' +
                '<div class="cmp-chat-header-close" id="cmpChatHeaderClose"><i class="fas fa-times"></i></div>' +
            '</div>' +
            '<div class="cmp-chat-body" id="cmpChatBody"></div>' +
            '<div class="cmp-chat-quick-replies" id="cmpChatQuickReplies"></div>' +
            '<div class="cmp-chat-input-row">' +
                '<input type="text" id="cmpChatInput" placeholder="আপোনাৰ প্ৰশ্ন লিখক..." autocomplete="off">' +
                '<button class="cmp-chat-send-btn" id="cmpChatSendBtn"><i class="fas fa-paper-plane"></i></button>' +
            '</div>' +
            '<div class="cmp-chat-footer-note">এইটো এটা ডেমো চেটবট — উত্তৰসমূহ পূৰ্ব-নিৰ্ধাৰিত।</div>';

        document.body.appendChild(launcher);
        document.body.appendChild(win);

        return { launcher: launcher, win: win };
    }

    function scrollToBottom(body) {
        body.scrollTop = body.scrollHeight;
    }

    function addMessage(body, text, sender) {
        var msg = document.createElement("div");
        msg.className = "cmp-chat-msg " + sender;
        msg.innerHTML = text.replace(/\n/g, "<br>");
        body.appendChild(msg);
        scrollToBottom(body);
    }

    function showTyping(body) {
        var typing = document.createElement("div");
        typing.className = "cmp-chat-typing";
        typing.id = "cmpChatTyping";
        typing.innerHTML = "<span></span><span></span><span></span>";
        body.appendChild(typing);
        scrollToBottom(body);
    }

    function removeTyping(body) {
        var typing = document.getElementById("cmpChatTyping");
        if (typing) typing.remove();
    }

    function botRespond(body, userText) {
        showTyping(body);
        var delay = 600 + Math.random() * 500;
        setTimeout(function () {
            removeTyping(body);
            addMessage(body, findReply(userText), "bot");
        }, delay);
    }

    function renderQuickReplies(container, body, input) {
        container.innerHTML = "";
        QUICK_REPLIES.forEach(function (label) {
            var chip = document.createElement("div");
            chip.className = "cmp-chat-chip";
            chip.textContent = label;
            chip.onclick = function () {
                addMessage(body, label, "user");
                botRespond(body, label);
            };
            container.appendChild(chip);
        });
    }

    function init() {
        var els = buildWidget();
        var launcher = els.launcher;
        var win = els.win;
        var body = win.querySelector("#cmpChatBody");
        var quickReplies = win.querySelector("#cmpChatQuickReplies");
        var input = win.querySelector("#cmpChatInput");
        var sendBtn = win.querySelector("#cmpChatSendBtn");
        var headerClose = win.querySelector("#cmpChatHeaderClose");

        var greeted = false;

        function openChat() {
            win.classList.add("active");
            launcher.classList.add("open");
            if (!greeted) {
                greeted = true;
                setTimeout(function () {
                    addMessage(body, "নমস্কাৰ! 🙏 CMP সহায়ক চেটবটলৈ স্বাগতম। আপুনি প্ৰকল্পৰ বিষয়ে কি জানিব বিচাৰে?", "bot");
                    renderQuickReplies(quickReplies, body, input);
                }, 300);
            }
            setTimeout(function () { input.focus(); }, 200);
        }

        function closeChat() {
            win.classList.remove("active");
            launcher.classList.remove("open");
        }

        launcher.addEventListener("click", function () {
            if (win.classList.contains("active")) {
                closeChat();
            } else {
                openChat();
            }
        });

        headerClose.addEventListener("click", closeChat);

        function sendMessage() {
            var text = input.value.trim();
            if (!text) return;
            addMessage(body, text, "user");
            input.value = "";
            botRespond(body, text);
        }

        sendBtn.addEventListener("click", sendMessage);
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
