// 导航站全部内容都在这个文件里。
// 增删改分类/站点只动这里，不用碰其他代码。
// 结构：{ engines: [...], categories: [{ id, name, icon, hue, sites: [{ name, url, desc, tags: [] }] }] }
// tags 每个分类有一套固定维度（收费情况 / 语言 / 类型 / 可达性等），新增站点请沿用同分类的标签词表。
window.NAV_DATA = {
  engines: [
    { name: "Bing", url: "https://www.bing.com/search?q=%s" },
    { name: "百度", url: "https://www.baidu.com/s?wd=%s" },
    { name: "Google", url: "https://www.google.com/search?q=%s" },
    { name: "GitHub", url: "https://github.com/search?q=%s" },
    { name: "npm", url: "https://www.npmjs.com/search?q=%s" },
    { name: "掘金", url: "https://juejin.cn/search?query=%s" }
  ],

  categories: [
    // ── 标签维度：模型系列 / 强项 / 收费情况 ──
    {
      id: "ai",
      name: "AI 助手",
      icon: "🤖",
      hue: 265,
      sites: [
        { name: "ChatGPT", url: "https://chatgpt.com", desc: "OpenAI 旗舰，综合能力标杆，生态插件最全", tags: ["GPT 系列", "多模态", "深度研究"] },
        { name: "Claude", url: "https://claude.ai", desc: "Anthropic 出品，长文写作与代码质量口碑最佳", tags: ["写作强", "代码强", "Artifacts"] },
        { name: "Gemini", url: "https://gemini.google.com", desc: "谷歌 AI，多模态原生，免费额度大方", tags: ["多模态", "接谷歌全家桶", "免费额度大"] },
        { name: "DeepSeek", url: "https://chat.deepseek.com", desc: "深度求索，推理与代码开源标杆，性价比极高", tags: ["R1 推理", "开源", "免费"] },
        { name: "智谱清言", url: "https://chatglm.cn", desc: "智谱 GLM 系列，中文综合第一梯队", tags: ["GLM", "中文强", "免费"] },
        { name: "Kimi", url: "https://kimi.moonshot.cn", desc: "月之暗面，超长上下文阅读之王，适合长文档", tags: ["长文本", "文件解读", "免费"] },
        { name: "通义千问", url: "https://tongyi.aliyun.com", desc: "阿里 Qwen 系列，全家桶集成，办公场景顺手", tags: ["Qwen", "多模态", "办公集成"] },
        { name: "豆包", url: "https://www.doubao.com", desc: "字节跳动，中文日常问答与语音视频交互", tags: ["中文生态", "语音对话", "免费"] },
        { name: "腾讯元宝", url: "https://yuanbao.tencent.com", desc: "腾讯混元，打通微信生态，可搜公众号内容", tags: ["混元", "微信生态", "免费"] },
        { name: "讯飞星火", url: "https://xinghuo.xfyun.cn", desc: "科大讯飞，语音交互与教育办公场景见长", tags: ["语音强", "教育场景", "免费"] },
        { name: "Grok", url: "https://grok.com", desc: "马斯克 xAI 出品，实时接入 X 数据，风格开放", tags: ["实时 X 数据", "xAI"] },
        { name: "Perplexity", url: "https://www.perplexity.ai", desc: "AI 搜索引擎代表，答案自带引用来源", tags: ["AI 搜索", "带引用来源"] }
      ]
    },
    // ── 标签维度：开源类型 / 能力 / 生态 ──
    {
      id: "aidev",
      name: "AI 开发",
      icon: "🧠",
      hue: 285,
      sites: [
        { name: "Hugging Face", url: "https://huggingface.co", desc: "全球最大开源模型社区", tags: ["开源模型", "数据集", "Demo"] },
        { name: "HF 国内镜像", url: "https://hf-mirror.com", desc: "国内下载开源模型必备加速", tags: ["镜像加速", "开源模型"] },
        { name: "魔搭 ModelScope", url: "https://www.modelscope.cn", desc: "阿里开源模型平台", tags: ["开源模型", "免费算力"] },
        { name: "魔乐社区", url: "https://modelers.cn", desc: "华为昇腾系开源模型社区", tags: ["昇腾生态", "开源模型"] },
        { name: "始智 AI wisemodel", url: "https://wisemodel.cn", desc: "中立开源模型社区", tags: ["开源模型", "国产"] },
        { name: "Gitee AI", url: "https://ai.gitee.com", desc: "开源模型托管与免费 API", tags: ["开源模型", "免费 API"] },
        { name: "Civitai", url: "https://civitai.com", desc: "开源图像模型最大社区", tags: ["SD 模型", "LoRA"] },
        { name: "Llama", url: "https://www.llama.com", desc: "Meta 开源模型官方", tags: ["Llama 系列", "开放权重"] },
        { name: "DeepSeek 开放平台", url: "https://platform.deepseek.com", desc: "开源模型 DeepSeek 官方 API", tags: ["V3/R1", "开放权重", "低价"] },
        { name: "智谱开放平台", url: "https://open.bigmodel.cn", desc: "开源 GLM 系列官方 API", tags: ["GLM", "开放权重"] },
        { name: "Ollama", url: "https://ollama.com", desc: "本地一键跑开源模型", tags: ["本地部署", "开源模型"] },
        { name: "LM Studio", url: "https://lmstudio.ai", desc: "桌面端本地运行开源模型", tags: ["本地部署", "图形界面"] },
        { name: "vLLM", url: "https://docs.vllm.ai", desc: "高性能开源推理引擎", tags: ["推理加速", "开源"] },
        { name: "OpenRouter", url: "https://openrouter.ai", desc: "开源模型聚合 API 一站调用", tags: ["API 聚合", "多模型"] },
        { name: "Kaggle", url: "https://www.kaggle.com", desc: "数据竞赛与开源数据集", tags: ["数据集", "免费 GPU"] },
        { name: "LangChain", url: "https://www.langchain.com", desc: "开源 LLM 应用开发框架", tags: ["开源框架", "Agent"] },
        { name: "agent-qa", url: "https://vostride.com", desc: "网页、Android 与 iOS 自然语言测试；memidex 持久记忆、经验证的自我改进、MCP 与可复查运行证据。模型等服务费用依配置与用量产生。", tags: ["Agent"] }
      ]
    },
    // ── 标签维度：内容类型 / 收费情况 / 可达性 ──
    {
      id: "aigc",
      name: "AIGC 创作",
      icon: "✨",
      hue: 275,
      sites: [
        { name: "Midjourney", url: "https://www.midjourney.com", desc: "顶级 AI 绘画", tags: ["图像", "付费为主", "海外服务"] },
        { name: "即梦 AI", url: "https://jimeng.jianying.com", desc: "字节 AI 绘图与视频", tags: ["图像", "视频", "有免费额度"] },
        { name: "通义万相", url: "https://tongyi.aliyun.com/wanxiang", desc: "阿里 AI 绘画", tags: ["图像", "国内可用", "有免费额度"] },
        { name: "LiblibAI", url: "https://www.liblib.art", desc: "国内最大 SD 模型社区", tags: ["图像", "开源模型", "国内可用"] },
        { name: "Stable Diffusion", url: "https://stability.ai", desc: "开源图像生成官方", tags: ["图像", "开源", "可本地部署"] },
        { name: "可灵 AI", url: "https://klingai.com", desc: "快手 AI 视频生成", tags: ["视频", "国内可用", "有免费额度"] },
        { name: "Sora", url: "https://sora.com", desc: "OpenAI 视频生成", tags: ["视频", "付费为主", "海外服务"] },
        { name: "Runway", url: "https://runwayml.com", desc: "AI 视频创作套件", tags: ["视频", "付费为主", "海外服务"] },
        { name: "剪映", url: "https://www.capcut.cn", desc: "AI 视频剪辑", tags: ["视频剪辑", "国内可用", "免费为主"] },
        { name: "Suno", url: "https://suno.com", desc: "AI 写歌作曲", tags: ["音乐", "有免费额度", "海外服务"] },
        { name: "ElevenLabs", url: "https://elevenlabs.io", desc: "AI 语音合成", tags: ["语音", "有免费额度", "海外服务"] },
        { name: "海螺 AI", url: "https://hailuoai.com", desc: "MiniMax 语音与视频", tags: ["语音", "视频", "国内可用"] },
        { name: "秘塔写作猫", url: "https://xiezuocat.com", desc: "AI 写作与校对", tags: ["写作", "国内可用", "有免费额度"] },
        { name: "Gamma", url: "https://gamma.app", desc: "AI 一键生成 PPT", tags: ["PPT", "有免费额度", "海外服务"] },
        { name: "Canva 可画", url: "https://www.canva.cn", desc: "AI 设计工具", tags: ["设计", "国内可用", "有免费额度"] }
      ]
    },
    // ── 标签维度：语言定位 / 特色 ──
    {
      id: "backend",
      name: "语言与后端",
      icon: "☕",
      hue: 210,
      sites: [
        { name: "Java", url: "https://dev.java", desc: "Java 官方开发者站点", tags: ["JVM 生态", "企业主流"] },
        { name: "OpenJDK", url: "https://openjdk.org", desc: "OpenJDK 官方社区", tags: ["JDK 实现", "开源"] },
        { name: "Python", url: "https://www.python.org", desc: "Python 官网与文档", tags: ["AI/脚本首选", "开源"] },
        { name: "Go", url: "https://go.dev", desc: "Go 官方站点", tags: ["云原生", "并发强"] },
        { name: "Rust", url: "https://www.rust-lang.org", desc: "Rust 官方站点", tags: ["系统级", "内存安全"] },
        { name: "Node.js", url: "https://nodejs.org", desc: "Node.js 官网", tags: ["JS 运行时", "开源"] },
        { name: "Spring", url: "https://spring.io", desc: "Java 生态第一框架", tags: ["微服务", "开源"] },
        { name: ".NET", url: "https://dotnet.microsoft.com", desc: "微软 .NET 平台", tags: ["微软系", "跨平台"] },
        { name: "PHP", url: "https://www.php.net", desc: "PHP 官网与文档", tags: ["Web 老牌", "中文文档"] },
        { name: "C++ 参考", url: "https://zh.cppreference.com", desc: "C++ 中文参考手册", tags: ["系统级", "中文文档"] }
      ]
    },
    // ── 标签维度：数据库类型 / 授权情况 ──
    {
      id: "db",
      name: "数据库",
      icon: "🗄️",
      hue: 25,
      sites: [
        { name: "MySQL", url: "https://www.mysql.com", desc: "最流行开源关系库", tags: ["关系型", "开源"] },
        { name: "PostgreSQL", url: "https://www.postgresql.org", desc: "功能最强开源关系库", tags: ["关系型", "开源"] },
        { name: "Redis", url: "https://redis.io", desc: "内存键值数据库", tags: ["KV 缓存", "开源"] },
        { name: "MongoDB", url: "https://www.mongodb.com", desc: "文档型 NoSQL", tags: ["文档型", "NoSQL"] },
        { name: "SQLite", url: "https://www.sqlite.org", desc: "嵌入式轻量数据库", tags: ["嵌入式", "公有领域"] },
        { name: "ClickHouse", url: "https://clickhouse.com", desc: "列式 OLAP 分析库", tags: ["OLAP", "开源"] },
        { name: "Elasticsearch", url: "https://www.elastic.co", desc: "搜索与分析引擎", tags: ["搜索分析", "分布式"] },
        { name: "DBeaver", url: "https://dbeaver.io", desc: "免费通用数据库客户端", tags: ["管理工具", "开源免费"] }
      ]
    },
    // ── 标签维度：文档性质 / 文档语言 ──
    {
      id: "frontend",
      name: "前端",
      icon: "🎨",
      hue: 15,
      sites: [
        { name: "MDN", url: "https://developer.mozilla.org", desc: "Web 标准权威文档", tags: ["权威文档", "有中文"] },
        { name: "React", url: "https://react.dev", desc: "官方文档与 API", tags: ["官方文档", "开源"] },
        { name: "Vue", url: "https://vuejs.org", desc: "渐进式框架官方文档", tags: ["官方文档", "中文文档"] },
        { name: "TypeScript", url: "https://www.typescriptlang.org", desc: "TS 手册与演练场", tags: ["官方文档", "开源"] },
        { name: "Tailwind CSS", url: "https://tailwindcss.com", desc: "原子化 CSS 框架", tags: ["官方文档", "开源"] },
        { name: "Vite", url: "https://vite.dev", desc: "下一代构建工具", tags: ["官方文档", "中文文档"] },
        { name: "Next.js", url: "https://nextjs.org", desc: "React 全栈框架", tags: ["官方文档", "开源"] },
        { name: "npm", url: "https://www.npmjs.com", desc: "包仓库与文档", tags: ["包仓库", "免费"] },
        { name: "jsDelivr", url: "https://www.jsdelivr.com", desc: "免费 CDN 加速", tags: ["免费 CDN", "无需登录"] },
        { name: "Can I Use", url: "https://caniuse.com", desc: "浏览器兼容性查询", tags: ["兼容查询", "免费"] },
        { name: "roadmap.sh", url: "https://roadmap.sh", desc: "开发者路线图", tags: ["学习路线", "免费开源"] }
      ]
    },
    // ── 标签维度：平台性质 / 账号要求 ──
    {
      id: "triend",
      name: "三端 / 移动开发",
      icon: "📱",
      hue: 160,
      sites: [
        { name: "微信开放平台", url: "https://open.weixin.qq.com", desc: "App 接入微信能力", tags: ["官方", "中文"] },
        { name: "微信公众平台", url: "https://mp.weixin.qq.com", desc: "公众号与小程序管理", tags: ["官方", "中文"] },
        { name: "HarmonyOS 开发者", url: "https://developer.huawei.com/consumer/cn/", desc: "鸿蒙开发官方入口", tags: ["官方", "中文"] },
        { name: "uni-app", url: "https://uniapp.dcloud.net.cn", desc: "一套代码编到多端", tags: ["官方文档", "中文友好"] },
        { name: "Taro", url: "https://docs.taro.zone", desc: "京东多端开发框架", tags: ["官方文档", "中文友好"] },
        { name: "Flutter", url: "https://flutter.dev", desc: "Google 跨端 UI 框架", tags: ["官方文档", "开源"] },
        { name: "React Native", url: "https://reactnative.dev", desc: "React 原生渲染", tags: ["官方文档", "开源"] },
        { name: "Electron", url: "https://www.electronjs.org", desc: "跨平台桌面应用", tags: ["官方文档", "开源"] },
        { name: "Expo", url: "https://expo.dev", desc: "RN 生态工具链", tags: ["官方文档", "开源"] },
        { name: "App Store Connect", url: "https://appstoreconnect.apple.com", desc: "iOS 上架管理", tags: ["官方", "需开发者账号"] },
        { name: "Google Play Console", url: "https://play.google.com/console", desc: "安卓上架管理", tags: ["官方", "需开发者账号"] }
      ]
    },
    // ── 标签维度：硬件生态 / 资源性质 ──
    {
      id: "iot",
      name: "物联网与硬件",
      icon: "📡",
      hue: 110,
      sites: [
        { name: "乐鑫 Espressif", url: "https://www.espressif.com", desc: "ESP 系列芯片官方", tags: ["芯片官方", "中文文档"] },
        { name: "树莓派", url: "https://www.raspberrypi.com", desc: "最受欢迎开发板", tags: ["开发板", "英文"] },
        { name: "Arduino", url: "https://www.arduino.cc", desc: "开源电子原型平台", tags: ["开源", "入门友好"] },
        { name: "ST 官方", url: "https://www.st.com", desc: "STM32 资料与工具", tags: ["芯片官方", "有中文站"] },
        { name: "RT-Thread", url: "https://www.rt-thread.org", desc: "国产开源物联网 OS", tags: ["国产", "开源"] },
        { name: "MQTT", url: "https://mqtt.org", desc: "MQTT 协议官方", tags: ["协议规范", "官方"] },
        { name: "Modbus", url: "https://www.modbus.org", desc: "Modbus 协议规范", tags: ["协议规范", "工业"] },
        { name: "嘉立创 EDA", url: "https://lceda.cn", desc: "免费在线电路设计", tags: ["国产", "免费"] }
      ]
    },
    // ── 标签维度：收费情况 / 使用门槛 ──
    {
      id: "nettools",
      name: "网络调试",
      icon: "🌐",
      hue: 200,
      sites: [
        { name: "Webhook.site", url: "https://webhook.site", desc: "临时 URL 接收回调调试", tags: ["免费", "无需登录"] },
        { name: "MQTTX", url: "https://mqttx.app", desc: "MQTT 跨平台调试客户端", tags: ["开源", "跨平台"] },
        { name: "Wireshark", url: "https://www.wireshark.org", desc: "抓包分析首选工具", tags: ["开源", "桌面工具"] },
        { name: "ipinfo.io", url: "https://ipinfo.io", desc: "IP 归属与 ASN 查询", tags: ["有免费额度", "带 API"] },
        { name: "crt.sh", url: "https://crt.sh", desc: "证书透明度日志查询", tags: ["免费", "无需登录"] },
        { name: "DNSChecker", url: "https://dnschecker.org", desc: "多地 DNS 解析对比", tags: ["免费", "无需登录"] },
        { name: "MXToolbox", url: "https://mxtoolbox.com", desc: "MX/SPF/DNS 诊断", tags: ["免费", "英文"] },
        { name: "BGP.tools", url: "https://bgp.tools", desc: "BGP 路由与 ASN 分析", tags: ["免费", "英文"] },
        { name: "Speedtest", url: "https://www.speedtest.cn", desc: "国内网络测速", tags: ["免费", "国内直连"] },
        { name: "httpbin", url: "https://httpbin.org", desc: "HTTP 请求回显测试", tags: ["免费", "开源"] }
      ]
    },
    // ── 标签维度：授权情况 / 用途 ──
    {
      id: "devops",
      name: "运维 DevOps",
      icon: "🔧",
      hue: 185,
      sites: [
        { name: "Docker", url: "https://www.docker.com", desc: "容器化标准", tags: ["容器", "商业产品注意授权"] },
        { name: "Kubernetes", url: "https://kubernetes.io", desc: "容器编排平台", tags: ["编排", "开源"] },
        { name: "Nginx", url: "https://nginx.org", desc: "高性能 Web/反代", tags: ["开源版", "高性能"] },
        { name: "Ansible", url: "https://www.ansible.com", desc: "自动化配置管理", tags: ["开源", "自动化"] },
        { name: "Terraform", url: "https://www.terraform.io", desc: "基础设施即代码", tags: ["IaC", "注意开源协议"] },
        { name: "Jenkins", url: "https://www.jenkins.io", desc: "老牌 CI/CD", tags: ["开源", "自托管"] },
        { name: "Prometheus", url: "https://prometheus.io", desc: "监控告警系统", tags: ["开源", "监控"] },
        { name: "Grafana", url: "https://grafana.com", desc: "可视化监控面板", tags: ["有开源版", "可视化"] },
        { name: "Linux 命令大全", url: "https://www.linuxcool.com", desc: "命令速查手册", tags: ["中文", "免费"] }
      ]
    },
    // ── 标签维度：资源性质 / 收费情况 ──
    {
      id: "security",
      name: "安全",
      icon: "🛡️",
      hue: 355,
      sites: [
        { name: "OWASP", url: "https://owasp.org", desc: "Web 安全十大指南", tags: ["开源", "免费"] },
        { name: "NVD", url: "https://nvd.nist.gov", desc: "美国国家漏洞库", tags: ["官方", "免费"] },
        { name: "CNNVD", url: "https://www.cnnvd.org.cn", desc: "国家信息安全漏洞库", tags: ["官方", "中文"] },
        { name: "奇安信威胁情报", url: "https://ti.qianxin.com", desc: "威胁情报查询", tags: ["中文", "有免费额度"] },
        { name: "微步在线", url: "https://x.threatbook.com", desc: "IP/域名情报分析", tags: ["中文", "有免费额度"] },
        { name: "VirusTotal", url: "https://www.virustotal.com", desc: "文件/网址多引擎查毒", tags: ["免费", "多引擎"] },
        { name: "Shodan", url: "https://www.shodan.io", desc: "互联网设备搜索引擎", tags: ["有免费额度", "英文"] },
        { name: "Have I Been Pwned", url: "https://haveibeenpwned.com", desc: "账号泄露查询", tags: ["免费", "隐私查询"] }
      ]
    },
    // ── 标签维度：语言 / 收费情况 ──
    {
      id: "algo",
      name: "算法刷题",
      icon: "🧩",
      hue: 320,
      sites: [
        { name: "力扣 LeetCode", url: "https://leetcode.cn", desc: "刷题第一站", tags: ["中文", "有免费题库"] },
        { name: "牛客网", url: "https://www.nowcoder.com", desc: "笔试面试题库", tags: ["中文", "求职向"] },
        { name: "AcWing", url: "https://www.acwing.com", desc: "算法题解与课程", tags: ["中文", "付费课程"] },
        { name: "洛谷", url: "https://www.luogu.com.cn", desc: "OI/ACM 题库", tags: ["中文", "免费"] },
        { name: "Codeforces", url: "https://codeforces.com", desc: "全球竞技编程", tags: ["英文", "免费"] },
        { name: "HackerRank", url: "https://www.hackerrank.com", desc: "技能认证刷题", tags: ["英文", "免费"] },
        { name: "VisuAlgo", url: "https://visualgo.net", desc: "数据结构可视化", tags: ["可视化", "免费"] },
        { name: "蓝桥杯", url: "https://www.lanqiao.cn", desc: "国内编程大赛", tags: ["赛事", "中文"] }
      ]
    },
    // ── 标签维度：收费情况 / 使用门槛 ──
    {
      id: "devtools",
      name: "在线开发工具",
      icon: "🧰",
      hue: 45,
      sites: [
        { name: "Regex101", url: "https://regex101.com", desc: "正则调试与解释", tags: ["免费", "无需登录"] },
        { name: "CodePen", url: "https://codepen.io", desc: "前端效果在线试验", tags: ["有免费额度", "需登录"] },
        { name: "StackBlitz", url: "https://stackblitz.com", desc: "浏览器里的完整 IDE", tags: ["有免费额度", "免登录可用"] },
        { name: "Carbon", url: "https://carbon.now.sh", desc: "代码生成精美分享图", tags: ["免费", "无需登录"] },
        { name: "Excalidraw", url: "https://excalidraw.com", desc: "手绘风架构图白板", tags: ["免费", "开源"] },
        { name: "ProcessOn", url: "https://www.processon.com", desc: "流程图与思维导图", tags: ["中文", "有免费额度"] },
        { name: "JSON Hero", url: "https://jsonhero.ws", desc: "高颜值 JSON 查看", tags: ["免费", "开源"] },
        { name: "jqplay", url: "https://jqplay.org", desc: "jq 表达式在线试跑", tags: ["免费", "无需登录"] }
      ]
    },
    // ── 标签维度：收费情况 / 节点位置 ──
    {
      id: "deploy",
      name: "部署与云服务",
      icon: "☁️",
      hue: 225,
      sites: [
        { name: "Vercel", url: "https://vercel.com", desc: "前端一键部署", tags: ["有免费额度", "海外节点"] },
        { name: "Netlify", url: "https://www.netlify.com", desc: "静态站托管", tags: ["有免费额度", "海外节点"] },
        { name: "Cloudflare", url: "https://www.cloudflare.com", desc: "CDN / Workers / 域名", tags: ["有免费额度", "国内可达"] },
        { name: "GitHub Pages", url: "https://pages.github.com", desc: "免费静态托管", tags: ["免费", "需 GitHub 账号"] },
        { name: "Supabase", url: "https://supabase.com", desc: "开源 BaaS 后端", tags: ["有免费额度", "开源"] },
        { name: "Railway", url: "https://railway.app", desc: "一键部署全栈应用", tags: ["有免费额度", "海外节点"] },
        { name: "Fly.io", url: "https://fly.io", desc: "边缘容器部署", tags: ["有免费额度", "海外节点"] },
        { name: "Docker Hub", url: "https://hub.docker.com", desc: "容器镜像仓库", tags: ["免费", "镜像仓库"] },
        { name: "阿里云", url: "https://www.aliyun.com", desc: "国内云服务", tags: ["国内", "需实名"] },
        { name: "腾讯云", url: "https://cloud.tencent.com", desc: "国内云服务", tags: ["国内", "需实名"] }
      ]
    },
    // ── 标签维度：语言 / 收费情况 ──
    {
      id: "learn",
      name: "学习与问答",
      icon: "📚",
      hue: 300,
      sites: [
        { name: "GitHub", url: "https://github.com", desc: "全球最大代码托管", tags: ["代码托管", "免费"] },
        { name: "Stack Overflow", url: "https://stackoverflow.com", desc: "编程问答", tags: ["英文", "免费"] },
        { name: "掘金", url: "https://juejin.cn", desc: "中文技术社区", tags: ["中文", "免费"] },
        { name: "菜鸟教程", url: "https://www.runoob.com", desc: "入门教程大全", tags: ["中文", "免费"] },
        { name: "W3school", url: "https://www.w3school.com.cn", desc: "Web 基础教程", tags: ["中文", "免费"] },
        { name: "廖雪峰的官方网站", url: "https://www.liaoxuefeng.com", desc: "经典中文系列教程", tags: ["中文", "免费"] },
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "免费编程认证课程", tags: ["免费", "认证课程"] },
        { name: "中国大学 MOOC", url: "https://www.icourse163.org", desc: "高校公开课", tags: ["中文", "高校课程"] },
        { name: "CS 自学指南", url: "https://csdiy.wiki", desc: "计算机自学路线百科", tags: ["中文", "免费"] }
      ]
    },
    // ── 标签维度：语言 / 社区类型 ──
    {
      id: "community",
      name: "社区冲浪",
      icon: "🧭",
      hue: 240,
      sites: [
        { name: "V2EX", url: "https://www.v2ex.com", desc: "创意工作者社区", tags: ["中文", "综合论坛"] },
        { name: "知乎", url: "https://www.zhihu.com", desc: "中文问答社区", tags: ["中文", "问答"] },
        { name: "哔哩哔哩", url: "https://www.bilibili.com", desc: "技术视频学习社区", tags: ["中文", "视频"] },
        { name: "博客园", url: "https://www.cnblogs.com", desc: "老牌开发者博客社区", tags: ["中文", "博客"] },
        { name: "CSDN", url: "https://www.csdn.net", desc: "最大中文开发者社区", tags: ["中文", "部分付费"] },
        { name: "SegmentFault 思否", url: "https://segmentfault.com", desc: "中文开发者问答社区", tags: ["中文", "问答"] },
        { name: "开源中国", url: "https://www.oschina.net", desc: "开源资讯与社区", tags: ["中文", "开源资讯"] },
        { name: "InfoQ 中文站", url: "https://www.infoq.cn", desc: "深度技术内容", tags: ["中文", "深度内容"] },
        { name: "IT之家", url: "https://www.ithome.com", desc: "科技资讯社区", tags: ["中文", "科技资讯"] },
        { name: "少数派", url: "https://sspai.com", desc: "数字效率社区", tags: ["中文", "效率内容"] },
        { name: "Linux.do", url: "https://linux.do", desc: "新一代开发者论坛", tags: ["中文", "论坛"] },
        { name: "Linux 中国", url: "https://linux.cn", desc: "中文 Linux 资讯社区", tags: ["中文", "门户"] },
        { name: "Linux.org", url: "https://linux.org", desc: "英文 Linux 论坛", tags: ["英文", "论坛"] },
        { name: "Linux.com", url: "https://linux.com", desc: "Linux 基金会社区", tags: ["英文", "资讯"] },
        { name: "Hacker News", url: "https://news.ycombinator.com", desc: "硅谷技术资讯", tags: ["英文", "资讯"] },
        { name: "dev.to", url: "https://dev.to", desc: "开发者博客社区", tags: ["英文", "博客"] },
        { name: "Reddit", url: "https://www.reddit.com", desc: "全球综合社区", tags: ["英文", "综合"] },
        { name: "X (Twitter)", url: "https://x.com", desc: "全球技术圈动态", tags: ["英文", "社交"] },
        { name: "Product Hunt", url: "https://www.producthunt.com", desc: "新产品发现", tags: ["英文", "新产品"] },
        { name: "Medium", url: "https://medium.com", desc: "海外博客平台", tags: ["英文", "部分付费"] }
      ]
    },
    // ── 标签维度：收费情况 / 语言 ──
    {
      id: "daily",
      name: "效率日常",
      icon: "⚡",
      hue: 120,
      sites: [
        { name: "Notion", url: "https://www.notion.so", desc: "笔记与知识库", tags: ["有免费额度", "英文为主"] },
        { name: "语雀", url: "https://www.yuque.com", desc: "团队知识库", tags: ["中文", "有免费额度"] },
        { name: "flomo", url: "https://flomoapp.com", desc: "卡片式笔记", tags: ["中文", "有免费额度"] },
        { name: "幕布", url: "https://mubu.com", desc: "大纲笔记与思维导图", tags: ["中文", "有免费额度"] },
        { name: "TinyPNG", url: "https://tinypng.com", desc: "图片无损压缩", tags: ["免费", "英文"] },
        { name: "DeepL", url: "https://www.deepl.com", desc: "高质量翻译", tags: ["有免费额度", "英文"] }
      ]
    }
  ]
};
