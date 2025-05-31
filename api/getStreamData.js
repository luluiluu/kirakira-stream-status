export default async function handler(req, res) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;

  console.log("🔧 Twitch API リクエスト開始");
  console.log("🔑 CLIENT_ID:", CLIENT_ID ? "[OK]" : "[空]");
  console.log("🔑 ACCESS_TOKEN:", ACCESS_TOKEN ? "[OK]" : "[空]");

  const streamers = [
    'luluiluu', 
    'yuzukitsuzuruki', 
    'mimyou', 
    'shupeso3',
    'ww_okasama_ww', 
    'namb1000', 
    'dago_makaseroi', 
    'sikanohea',
    'raziii03', 
    'kixxxgame', 
    'baccsan', 
    'inoue_takina_patimon'
  ];

  try {
    const headers = {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    };

    const usersUrl = `https://api.twitch.tv/helix/users?${streamers.map(name => `login=${encodeURIComponent(name)}`).join('&')}`;
    const streamsUrl = `https://api.twitch.tv/helix/streams?${streamers.map(name => `user_login=${encodeURIComponent(name)}`).join('&')}`;

    const [usersRes, streamsRes] = await Promise.all([
      fetch(usersUrl, { headers }),
      fetch(streamsUrl, { headers })
    ]);

    const usersData = await usersRes.json();
    const streamsData = await streamsRes.json();

    console.log("📦 usersData:", usersData);
    console.log("📦 streamsData:", streamsData);

    res.status(200).json({
      users: usersData.data,
      streams: streamsData.data
    });

  } catch (err) {
    console.error("🔥 APIエラー:", err);
    res.status(500).json({ error: 'Failed to fetch Twitch data' });
  }
}
