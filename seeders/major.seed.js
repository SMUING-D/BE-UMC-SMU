const { Major } = require('../models/major');

const MAJOR_LIST = [
    '컴퓨터과학과',
    '휴먼지능정보공학전공',
    '경제금융학부',
    '역사콘텐츠전공',
    '지적재산권전공',
    '문헌정보학전공',
    '공간환경학부',
    '행정학부',
    '가족복지학과',
    '국가안보학과',
    '국어교육과',
    '영어교육과',
    '교육학과',
    '수학교육과',
    '경영학부',
    '글로벌경영학과',
    '융합경영학과',
    '핀테크·빅데이터융합·스마트생산 전공',
    '전기공학전공',
    '지능IOT융합전공',
    '게임전공',
    '애니메이션전공',
    '한일문화콘텐츠전공',
    '생명공학전공',
    '화학에너지공학전공',
    '화공신소재전공',
    '식품영양학전공',
    '의류학전공',
    '스포츠건강관리전공',
    '무용예술전공',
    '조형예술전공',
    '생활예술전공',
    '음악학부',
];

exports.insertMajorList = async (Major) => {
    try {
        for (const majorName of MAJOR_LIST) {
            await Major.create({ majorName });
        }
        console.log('Major List inserted successfully.');
    } catch (error) {
        console.error('Error inserting Major List:', error);
    }
};
