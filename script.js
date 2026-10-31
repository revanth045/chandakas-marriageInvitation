// Change these sample details as soon as the family is ready.
const wedding={groom:"Rohith",bride:"Sandya",date:"2026-11-25T21:32:00+05:30",dateLabel:"25 November 2026",time:"9:32 PM",venue:"Anakapalli, Andhra Pradesh",mapQuery:"Anakapalli, Andhra Pradesh"};
document.querySelectorAll("[data-groom]").forEach(x=>x.textContent=wedding.groom);
document.querySelectorAll("[data-bride]").forEach(x=>x.textContent=wedding.bride);
document.querySelectorAll("[data-date]").forEach(x=>x.textContent=wedding.dateLabel);
document.querySelectorAll("[data-time]").forEach(x=>x.textContent=wedding.time);
document.querySelectorAll("[data-venue]").forEach(x=>x.textContent=wedding.venue);
document.title="The Wedding of "+wedding.groom+" & "+wedding.bride;
const venueMapUrl="https://www.google.com/maps/place/Satya+lakshmi+Grand+function+hall/@17.6820821,83.0067003,17z/data=!3m1!4b1!4m6!3m5!1s0x3a39716e255174df:0x93af1b866a1912c2!8m2!3d17.682077!4d83.0092752!16s%2Fg%2F11st8_n0y6?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D";
document.getElementById("map").href=venueMapUrl;
document.getElementById("diningMap").href=venueMapUrl;
document.body.style.overflow="hidden";
document.getElementById("open").addEventListener("click",()=>{document.getElementById("cover").classList.add("open");document.body.style.overflow="";startWeddingMusic()});
const target=new Date(wedding.date).getTime();
function tick(){let n=Math.max(0,target-Date.now());for(const [id,size] of Object.entries({days:86400000,hours:3600000,minutes:60000,seconds:1000})){document.getElementById(id).textContent=String(Math.floor(n/size)).padStart(2,"0");n%=size}}
tick();setInterval(tick,1000);

const weddingAudio=document.getElementById("weddingMusic");
const musicToggle=document.getElementById("musicToggle");
weddingAudio.volume=0.45;
function syncMusicControl(){const playing=!weddingAudio.paused&&!weddingAudio.muted;musicToggle.classList.toggle("muted",!playing);musicToggle.setAttribute("aria-label",playing?"Mute music":"Play music");musicToggle.title=playing?"Mute music":"Play music"}
function startWeddingMusic(){weddingAudio.muted=false;weddingAudio.play().then(syncMusicControl).catch(()=>{weddingAudio.muted=true;syncMusicControl()})}
weddingAudio.play().then(syncMusicControl).catch(()=>{weddingAudio.muted=true;syncMusicControl()});
musicToggle.addEventListener("click",()=>{if(weddingAudio.paused||weddingAudio.muted)startWeddingMusic();else{weddingAudio.muted=true;syncMusicControl()}});
weddingAudio.addEventListener("play",syncMusicControl);weddingAudio.addEventListener("pause",syncMusicControl);weddingAudio.addEventListener("volumechange",syncMusicControl);

let resumeAfterVisibility=false;
document.addEventListener("visibilitychange",()=>{if(document.hidden){resumeAfterVisibility=!weddingAudio.paused&&!weddingAudio.muted;if(resumeAfterVisibility){weddingAudio.pause();syncMusicControl()}}else if(resumeAfterVisibility&&!weddingAudio.muted){resumeAfterVisibility=false;startWeddingMusic()} });
