# Osrs-trends

**The website is hosted on [Github Pages](https://sthoresen.github.io/osrs-trends-frontend/).**

This is an investing tool for use in the in-game economy in the game _Old School Runescape_. This repository has no affiliations with Jagex©, the developers of the game.

Items in the game are traded through the Grand Exchange, an automated peer-to-peer trading system whose activity is tracked through numerous APIs. This project uses the [Weird Gloop API](https://api.weirdgloop.org/), which powers the community wikis.

This project implements a frontend in React (with Vite) that displays metrics and enables browsing of data calculated in the [python backend repo](https://github.com/sthoresen/osrs-trends). The website is currently static and reads data through JSON files in /data.

In addition to showing the price history of items, this website calculates several metrics that are useful for finding long-term investment items in the game economy. In contrast to real-life stock markets, the Grand Exchange is arguably not an efficient market as very few players engage in long-term investing. This makes it possible for simple mean-reversal strategies to have strong performance. The website displays features related to mean-reversal strategies such as trend-lines, trend-line crosses, trend-line differences, extremal points etc.  


| ![Chart](https://github.com/sthoresen/osrs-trends-frontend/assets/31217308/a49d0bd5-17ce-4c03-96fc-69607bc3042e) |
|:--:|
| *A price history chart with a trend line and calculated points* |

| ![Table](https://github.com/sthoresen/osrs-trends-frontend/assets/31217308/61f17292-53ca-4a0e-b05f-f0509bbb6bc9) |
|:--:|
| *A table with several useful attributes related to price history and mean reversal*  |
