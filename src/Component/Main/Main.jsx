// Main.jsx
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './Main.css';

export default function Main() {
  const [nickname, setNickname] = useState('');
  const [ageType, setAgeType] = useState('비공개');
  const [majors, setMajors] = useState({ 글: false, 그림: false, 썰: false, 소비: false, 공예: false, 코스:false, 영상 :false });
  const [tweet, setTweet] = useState({ RT多: false, 마음多: false, 할말만: false, 뻘소리: false, 일상: false, 탐라대화多: false, 타장르: false, 욕설: false, 수위:false, 우울 :false });
  const [tweetEtc, setTweetEtc] = useState('');
  const [majorEtc, setMajorEtc] = useState('');
  const [allEtc, setAllEtc] = useState('');
  const [fubFree, setFubFree] = useState(null);
  const [relation, setRelation] = useState({ 블언블: false, 언팔: false, 블락: false, 뮤트 : false});
  const [relationEtc, setRelationEtc] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [highlight, setHighlight] = useState({ nickname: true, age: true, majors: true, fub: true, relation: true });

  const canvasRef = useRef(null);

  const onUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImg(url);
  };

  const toggleMajor = (key) => setMajors(prev => ({ ...prev, [key]: !prev[key] }));
    const toggleTweet = (key) => setTweet(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleRelation = (key) => setRelation(prev => ({ ...prev, [key]: !prev[key] }));

  const exportPNG = async () => {
    const node = canvasRef.current;
    if (!node) return;
    const scale = 2;
    const canvas = await html2canvas(node, { backgroundColor: '#ffffff', scale, useCORS: true });
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `profile-card-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="pageWrap">
      <div className="sidebar">
        <h2>설정</h2>
        <div className="section">
          <label>프로필 이미지</label>
          <input type="file" accept="image/*" onChange={onUploadImage} />
        </div>

        <div className="section">
          <label>닉네임</label>
          <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임" />
        </div>

        <div className="section">
          <label>나이 표기</label>
          <div className="chipsRow">
            {['성인','미성년자','비공개'].map(k => (
              <button key={k} className={ageType===k?'chip active':'chip'} onClick={() => setAgeType(k)}>{k}</button>
            ))}
          </div>
        </div>
        <div className="section">
          <label>전공/활동</label>
          <div className="chipsRow">
            {Object.keys(majors).map(k => (
              <button key={k} className={majors[k]?'chip active':'chip'} onClick={() => toggleMajor(k)}>{k}</button>
            ))}
          </div>
          <input value={majorEtc} onChange={e => setMajorEtc(e.target.value)} placeholder="기타" />
        </div>
        <div className="section">
          <label>트윗 성향</label>
          <div className="chipsRow">
            {Object.keys(tweet).map(k => (
              <button key={k} className={tweet[k]?'chip active':'chip'} onClick={() => toggleTweet(k)}>{k}</button>
            ))}
          </div>
                  <input value={tweetEtc} onChange={e => setTweetEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>이별</label>
          <div className="chipsRow">
            {Object.keys(relation).map(k => (
              <button key={k} className={relation[k]?'chip active':'chip'} onClick={() => toggleRelation(k)}>{k}</button>
            ))}
          </div>
          <input value={relationEtc} onChange={e => setRelationEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>그 외 주의사항</label>
                  <input value={allEtc} onChange={e => setAllEtc(e.target.value)} placeholder="기타" />
        </div>
        <button className="button" onClick={exportPNG}>PNG 내보내기 (1000×600)</button>
      </div>
      <div className="canvasWrap">
        <div className="canvas" ref={canvasRef}>
          <div>
          <div className="row">
            <div className="profileBox">
              {profileImg?<img src={profileImg} alt='profile' className='profileImg'/>:<div className='profilePlaceholder'>프로필 이미지</div>}
            </div>
            <div className='profileInfo'>
              <div className='textBlock'>{nickname||'닉네임'}</div>
              <div className='textBlock'>연령대 | {ageType}</div>
            </div>
          </div>
          {/* <div>
            <p className='large-text'>트윗성향</p>
          </div> */}
          <div className='textBlock'>
            전공/활동 |{
              [
                ...Object.entries(majors).filter(([k,v])=>v).map(([k])=>k),
                ...(majorEtc ? [majorEtc] : [])
              ].join(', ')
            }
          </div>
          <div className='textBlock'>
            트윗 성향 | {
              [
                ...Object.entries(tweet).filter(([k,v])=>v).map(([k])=>k),
                ...(tweetEtc ? [tweetEtc] : [])
              ].join(', ')
            }
          </div>
          <div className='textBlock'>
            이별 | {
              [
                ...Object.entries(relation).filter(([k,v])=>v).map(([k])=>k),
                ...(relationEtc ? [relationEtc] : [])
              ].join(', ')
            }
          </div>
          {allEtc &&   
            <div  className='textBlock'>
              그 외 주의사항 | {allEtc}
            </div>
          }
          </div>

        </div>
      </div>
    </div>
  );
}
