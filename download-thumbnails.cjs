// download-thumbnails.js
const fs = require('fs');
const https = require('https');
const path = require('path');

// 原始外部图片链接列表
const externalImages = [
  "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer-600.png",
  "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra-600.png",
  "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability-600.png",
  "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-600.png",
  "https://phet.colorado.edu/sims/html/expression-exchange/latest/expression-exchange-600.png",
  "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=600&auto=format&fit=crop&q=80",
  "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic-600.png",
  "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-600.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/2048_logo.svg/600px-2048_logo.svg.png",
  "https://images.unsplash.com/photo-1603139771144-8025b306b38c?w=600&auto=format&fit=crop&q=80",
  "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-600.png",
  "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines-600.png",
  "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality-600.png",
  "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer-600.png",
  "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=600&auto=format&fit=crop&q=80",
  "https://hextris.github.io/hextris/images/logo.png",
  "https://phet.colorado.edu/sims/html/proportions-3d/latest/proportions-3d-600.png",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
  "https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher-600.png",
  "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics-600.png",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
  "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability-600.png",
  "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-600.png",
  "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics-600.png",
  "https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers-600.png",
  "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition-600.png"
];

const outputDir = path.join(__dirname, 'public', 'thumbnails');

// 确保目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 创建目录: ${outputDir}`);
}

// 下载函数
function downloadImage(url, index) {
  const filename = `lab-${index + 1}.png`;
  const filePath = path.join(outputDir, filename);

  // 如果文件已存在，跳过
  if (fs.existsSync(filePath)) {
    console.log(`⏭️ 已跳过 ${filename} (文件已存在)`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const options = url.includes('unsplash.com') ? {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    } : {};

    https.get(url, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          return downloadImage(redirectUrl, index).then(resolve).catch(reject);
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`下载失败 ${url} 状态码: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        console.log(`✅ 下载成功 ${filename}`);
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// 批量下载
async function downloadAll() {
  console.log(`🚀 开始下载 ${externalImages.length} 张缩略图...\n`);
  
  for (let i = 0; i < externalImages.length; i++) {
    try {
      await downloadImage(externalImages[i], i);
      // 加一点延迟避免被服务器屏蔽
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ 下载 lab-${i + 1}.png 失败:`, error.message);
    }
  }

  console.log('\n🎉 所有缩略图下载完成！');
  console.log(`📂 图片保存在: ${outputDir}`);
}

downloadAll();