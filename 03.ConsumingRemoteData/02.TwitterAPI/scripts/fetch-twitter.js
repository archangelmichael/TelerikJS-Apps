/*********************************************************************
 *  #### Twitter Post Fetcher v10.0 ####
 *  Coded by Jason Mayes 2013. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 *********************************************************************/

var twitterFetcher = function () {
    function x(e) {
        return e.replace(/<b[^>]*>(.*?)<\/b>/gi, function (c, e) {
            return e
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function p(e, c) {
        for (var g = [], f = RegExp("(^| )" + c + "( |$)"), a = e.getElementsByTagName("*"), h = 0, d = a.length; h < d; h++) f.test(a[h].className) && g.push(a[h]);
        return g
    }
    var domId = "",
        maxTweets = 20,
        enableLinks = true,
        options = [],
        t = false,
        showTime = true,
        showUser = true,
        dateFunction = null,
        v = true,
        showRt = true,
        customCallback = null,
        showIteraction = true;
    return {
        fetch: function (_id, _domId, _maxTweets, _enableLinks, _showUser, _showTime,
                         _dateFunction, _showRt, _customCallback, _showInteraction) {
            void 0 === _maxTweets && (_maxTweets = 20);
            void 0 === _enableLinks && (enableLinks = true);
            void 0 === _showUser && (_showUser = true);
            void 0 === _showTime && (_showTime = true);
            void 0 === _dateFunction && (_dateFunction = "default");
            void 0 === _showRt && (_showRt = true);
            void 0 === _customCallback && (_customCallback = null);
            void 0 === _showInteraction && (_showInteraction = true);
            if (t) {
                options.push({
                    id: _id,
                    domId: _domId,
                    maxTweets: _maxTweets,
                    enableLinks: _enableLinks,
                    showUser: _showUser,
                    showTime: _showTime,
                    dateFunction: _dateFunction,
                    showRt: _showRt,
                    customCallback: _customCallback,
                    showInteraction: _showInteraction
                })
            } else {
                t = true,
                    domId = _domId,
                    maxTweets = _maxTweets,
                    enableLinks = _enableLinks,
                    showUser = _showUser,
                    showTime = _showTime,
                    showRt = _showRt,
                    dateFunction = _dateFunction,
                    customCallback = _customCallback,
                    showIteraction = _showInteraction,
                    _domId = document.createElement("script"),
                    _domId.type = "text/javascript",
                    _domId.src = "https://cdn.syndication.twimg.com/widgets/timelines/" + _id + "?&lang=en&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(),
                    document.getElementsByTagName("head")[0].appendChild(_domId);
            }
        },

        callback: function (e) {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = e.body;
            "undefined" === typeof wrapper.getElementsByClassName && (v = false);
            e = [];
            var g = [],
                f = [],
                a = [],
                h = [],
                d = 0;
            if (v)
                for (wrapper = wrapper.getElementsByClassName("tweet") ; d < wrapper.length;) {
                    if (wrapper[d].getElementsByClassName("retweet-credit").length > 0) {
                        a.push(true);
                    } else {
                        a.push(false);
                    }
                    if (!a[d] || a[d] && showRt) e.push(wrapper[d].getElementsByClassName("e-entry-title")[0]), h.push(wrapper[d].getAttribute("data-tweet-id")), g.push(wrapper[d].getElementsByClassName("p-author")[0]), f.push(wrapper[d].getElementsByClassName("dt-updated")[0]);
                    d++
                } else
                for (wrapper = p(wrapper, "tweet") ; d < wrapper.length;) e.push(p(wrapper[d], "e-entry-title")[0]), h.push(wrapper[d].getAttribute("data-tweet-id")), g.push(p(wrapper[d], "p-author")[0]), f.push(p(wrapper[d], "dt-updated")[0]), 0 < p(wrapper[d], "retweet-credit").length ? a.push(true) : a.push(false), d++;
            e.length > maxTweets && (e.splice(maxTweets, e.length - maxTweets), g.splice(maxTweets, g.length - maxTweets), f.splice(maxTweets, f.length - maxTweets), a.splice(maxTweets, a.length - maxTweets));
            wrapper = [];
            d = e.length;
            for (a = 0; a < d; a++) {
                if ("string" !== typeof dateFunction) {
                    var b = new Date(f[a].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                        b = dateFunction(b);
                    f[a].setAttribute("aria-label", b);
                    if (e[a].innerText)
                        if (v) f[a].innerText = b;
                        else {
                            var m = document.createElement("p"),
                                n = document.createTextNode(b);
                            m.appendChild(n);
                            m.setAttribute("aria-label", b);
                            f[a] = m
                        } else f[a].textContent = b
                }
                b = "";
                if (enableLinks) {
                    if (showUser) {
                        b += '<div class="user">' + x(g[a].innerHTML) + "</div>";
                    }
                    b += '<p class="tweet">' + x(e[a].innerHTML) + "</p>";
                    if (showTime) {
                        b += '<p class="timePosted">' + f[a].getAttribute("aria-label") + "</p>";
                    }
                } else {
                    if (e[a].innerText) {
                        if (showUser) {
                            b += '<p class="user">' + g[a].innerText + "</p>";
                        }
                        b += '<p class="tweet">' + e[a].innerText + "</p>";
                        if (showTime) {
                            b += '<p class="timePosted">' + f[a].innerText + "</p>";
                        }
                    } else {
                        if(showUser) {
                            b += '<p class="user">' + g[a].textContent + "</p>";
                        }
                        b += '<p class="tweet">' + e[a].textContent + "</p>"
                        if (showTime) {
                            b += '<p class="timePosted">' + f[a].textContent + "</p>"
                        }
                    }
                }

                if (showIteraction) {
                    b += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + h[a] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + h[a] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + h[a] + '" class="twitter_fav_icon">Favorite</a></p>';
                }

                wrapper.push(b);
            }
            if (customCallback == null) {
                e = wrapper.length;

                f = document.getElementById(domId);
                h = "<ul>";
                for (g = 0; g < e; g++) {
                    h += "<li>" + wrapper[g] + "</li>"
                }
                h = h + "</ul>"
                f.innerHTML = h;
            } else {
                customCallback(wrapper);
            }
            t = false;
            if (options.length > 0) {
                twitterFetcher.fetch(options[0].id, options[0].domId, options[0].maxTweets, options[0].enableLinks, options[0].showUser, options[0].showTime, options[0].dateFunction, options[0].showRt, options[0].customCallback, options[0].showInteraction), options.splice(0, 1);
            }
        }
    }
}();