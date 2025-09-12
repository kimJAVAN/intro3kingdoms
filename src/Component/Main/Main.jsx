// Main.jsx
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './Main.css';

export default function Main() {
  const [nickname, setNickname] = useState('');
  const [ageType, setAgeType] = useState('비공개');
  const [majors, setMajors] = useState({
    글: false, 그림: false, 썰: false, 소비: false,
    공예: false, 코스: false, 영상: false
  });
  const [tweet, setTweet] = useState({
    RT多: false, 마음多: false, 할말만: false, 뻘소리: false, 일상: false,
    탐라대화多: false, 인용대화多: false, '타장르 언급': false,
    욕설: false, 수위: false, 우울: false
  });
  const [tweetEtc, setTweetEtc] = useState('');
  const [majorEtc, setMajorEtc] = useState('');
  const [allEtc, setAllEtc] = useState('');
  const [fubFree, setFubFree] = useState(null);
  const [relation, setRelation] = useState({ 블언블: false, 언팔: false, 블락: false, 뮤트: false });
  const [relationEtc, setRelationEtc] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [highlight, setHighlight] = useState({
    nickname: true, age: true, majors: true, fub: true, relation: true
  });

  // --- 덕질 성향 ---
  const [favChars, setFavChars] = useState('');          // 최애/차애
  const [cpReverseOk, setCpReverseOk] = useState(null);  // CP OX
  const [cpEtc, setCpEtc] = useState('');                // CP 비고
  const [triggers, setTriggers] = useState('');          // 지뢰
  const [triggerAction, setTriggerAction] = useState(''); // 지뢰 대처

  // --- 삼국지 관련 추가 상태 ---
  const [selectedFactions, setSelectedFactions] = useState([]); // 선호 진영
  const [favList, setFavList] = useState([{ img: null, name: '' }]); // 최애 삼국지
  const [oneWord, setOneWord] = useState(''); // 한마디

  const canvasRef = useRef(null);

  const onUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImg(url);
  };

  const toggleMajor = (key) =>
    setMajors(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleTweet = (key) =>
    setTweet(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleRelation = (key) =>
    setRelation(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleFaction = (side) => {
    setSelectedFactions(prev =>
      prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
    );
  };

  const handleFavImg = (idx, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFavList(prev => {
      const updated = [...prev];
      updated[idx].img = url;
      return updated;
    });
  };

  const handleFavName = (idx, value) => {
    setFavList(prev => {
      const updated = [...prev];
      updated[idx].name = value;
      return updated;
    });
  };

  const addFav = () => {
    if (favList.length < 3) setFavList([...favList, { img: null, name: '' }]);
  };

  const removeFav = (idx) => {
    if (favList.length > 1) {
      setFavList(prev => prev.filter((_, i) => i !== idx));
    }
  };

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
      {/* ---------------- Sidebar ---------------- */}
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
            {['성인', '미성년자', '비공개'].map(k => (
              <button key={k} className={ageType === k ? 'chip active' : 'chip'} onClick={() => setAgeType(k)}>{k}</button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>전공/활동</label>
          <div className="chipsRow">
            {Object.keys(majors).map(k => (
              <button key={k} className={majors[k] ? 'chip active' : 'chip'} onClick={() => toggleMajor(k)}>{k}</button>
            ))}
          </div>
          <input value={majorEtc} onChange={e => setMajorEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>트윗 성향</label>
          <div className="chipsRow">
            {Object.keys(tweet).map(k => (
              <button key={k} className={tweet[k] ? 'chip active' : 'chip'} onClick={() => toggleTweet(k)}>{k}</button>
            ))}
          </div>
          <input value={tweetEtc} onChange={e => setTweetEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>이별</label>
          <div className="chipsRow">
            {Object.keys(relation).map(k => (
              <button key={k} className={relation[k] ? 'chip active' : 'chip'} onClick={() => toggleRelation(k)}>{k}</button>
            ))}
          </div>
          <input value={relationEtc} onChange={e => setRelationEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>그 외 주의사항</label>
          <input value={allEtc} onChange={e => setAllEtc(e.target.value)} placeholder="기타" />
        </div>

        {/* -------- 덕질 성향 입력 -------- */}
        <div className="section">
          <label>최애/차애</label>
          <input
            value={favChars}
            onChange={e => setFavChars(e.target.value)}
            placeholder="최애/차애 입력"
          />
        </div>

        <div className="section">
          <label>CP / 리버스 ok</label>
          <input
            value={cpEtc}
            onChange={e => setCpEtc(e.target.value)}
            placeholder="CP 관련 비고 입력"
          />
          <div className="chipsRow">
            {['O', 'X'].map(opt => (
              <button
                key={opt}
                className={cpReverseOk === opt ? 'chip active' : 'chip'}
                onClick={() => setCpReverseOk(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>지뢰 / 지뢰 대처</label>
          <input
            value={triggers}
            onChange={e => setTriggers(e.target.value)}
            placeholder="지뢰 키워드"
          />
          <div className="chipsRow">
            {['블락', '뮤트', '알아서 거름', '멘션 아니면 OK'].map(opt => (
              <button
                key={opt}
                className={triggerAction === opt ? 'chip active' : 'chip'}
                onClick={() => setTriggerAction(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* -------- 삼국지 관련 입력 -------- */}
        <div className="section">
          <label>선호 진영</label>
          <div className="chipsRow">
            {['위', '촉', '오', '타'].map(side => (
              <button
                key={side}
                className={selectedFactions.includes(side) ? 'chip active' : 'chip'}
                onClick={() => toggleFaction(side)}
              >
                {side}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>최애 삼국지</label>
          {favList.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFavImg(idx, e.target.files?.[0])}
              />
              <input
                type="text"
                value={item.name}
                onChange={e => handleFavName(idx, e.target.value)}
                placeholder="작품 이름"
              />
              {favList.length > 1 && (
                <button onClick={() => removeFav(idx)}>-</button>
              )}
            </div>
          ))}
          {favList.length < 3 && <button onClick={addFav}>+ 추가</button>}
        </div>

        <div className="section">
          <label>한마디</label>
          <input
            value={oneWord}
            onChange={e => setOneWord(e.target.value)}
            placeholder="하고 싶은 말"
          />
        </div>
      </div>

      {/* ---------------- Canvas ---------------- */}
      <div className="canvasWrap">
        <button className="button" onClick={exportPNG}>PNG 내보내기 (1000×600)</button>
        <div className="canvas" ref={canvasRef}>
          <div className='text-area'>
            <div className="row">
              <div className="profileBox">
                {profileImg ? (
                  <img src={profileImg} alt='profile' className='profileImg' />
                ) : (
                  <div className='profilePlaceholder'>프로필 이미지</div>
                )}
              </div>
              <div className='profileInfo'>
                <div className='textBlock'>{nickname || '닉네임'}</div>
                <div className='textBlock'>연령대 | {ageType}</div>
              </div>
            </div>

            <div>
              <p className='large-text'>트윗성향</p>
            </div>

            <div className='textBlock'>
              전공/활동 | {
                [
                  ...Object.entries(majors).filter(([k, v]) => v).map(([k]) => k),
                  ...(majorEtc ? [majorEtc] : [])
                ].join(', ')
              }
            </div>

            <div className='textBlock'>
              트윗 성향 | {
                [
                  ...Object.entries(tweet).filter(([k, v]) => v).map(([k]) => k),
                  ...(tweetEtc ? [tweetEtc] : [])
                ].join(', ')
              }
            </div>

            <div className='textBlock'>
              이별 | {
                [
                  ...Object.entries(relation).filter(([k, v]) => v).map(([k]) => k),
                  ...(relationEtc ? [relationEtc] : [])
                ].join(', ')
              }
            </div>

            {allEtc &&
              <div className='textBlock'>
                그 외 주의사항 | {allEtc}
              </div>
            }

            <div>
              <p className='large-text'>덕질성향</p>
            </div>

            <div className='textBlock'>
              최애/차애 | {favChars || ''}
            </div>

            <div className='textBlock'>
              CP / 리버스 ok | {cpEtc || ''} {cpReverseOk ? `| ${cpReverseOk}` : ''}
            </div>

            <div className='textBlock'>
              지뢰 / 지뢰대처 | {triggers || ''}
              {triggerAction && ` | ${triggerAction}`}
            </div>
          </div>

          <div className='img-area'>
            <p className='large-text'>선호 진영</p>
            <div className='choose-area'>
              {['위', '촉', '오'].map(side => (
                <div
                  key={side}
                  className={`faction-logo ${selectedFactions.includes(side) ? 'active' : ''}`}
                >
                  {side}
                </div>
              ))}
            </div>

            <p className='large-text'>최애 삼국지</p>
            <div className='img-wrapper'>
              {favList.map((item, idx) => (
                <div className='img-unit' key={idx}>
                  <div className='img-overflow'>
                    {item.img ? (
                      <img src={item.img} alt={`fav-${idx}`} />
                    ) : (
                      <div className='img-placeholder'>+</div>
                    )}
                  </div>
                  {item.name && <p className='sul-name'>{item.name}</p>}
                </div>
              ))}
            </div>

            <p className='large-text'>한마디</p>
            <div className='textBlock'>
              <p>{oneWord}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
