"use client";
import { useState } from "react";
import Image from "next/image";
import { data } from "./ultis";

const InputCustom = ({
  value,
  setValue,
  placeholder,
  label,
}: {
  value: string;
  setValue: (x: string) => void;
  placeholder: string;
  label: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="">{label}: </label>
      <input
        className="border-1 border-#333 p-2 rounded-[8px]"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [scendName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isShowCard, setIsShowCard] = useState(true);
  const [score, setScore] = useState(0);
  const [scoreDC, setScoreDC] = useState(0);

  const renderColor = () => {
    const item = data.find((item) => item.id === score.toString());
    switch (item?.type) {
      case "ĐẠI CÁT":
        return "text-red-500";
      case "CÁT":
        return "text-blue-500";
      default:
        return "text-black";
    }
  };

  const normalizeString = (input: string): string => {
    const withLowercaseD = input.replace(/Đ/g, "đ");

    const noDiacriticsExceptD = withLowercaseD
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const onlyLettersAndD = noDiacriticsExceptD.replace(/[^a-zđ]/g, "");

    return onlyLettersAndD;
  };

  const formatNumber = (param: string) => {
    switch (param) {
      case "a":
        return 1;
      case "b":
        return 2;
      case "c":
        return 3;
      case "d":
        return 4;
      case "đ":
        return 5;
      case "e":
        return 6;
      case "g":
        return 7;
      case "h":
        return 8;
      case "i":
        return 9;
      case "k":
        return 10;
      case "l":
        return 11;
      case "m":
        return 12;
      case "n":
        return 13;
      case "o":
        return 14;
      case "p":
        return 15;
      case "q":
        return 16;
      case "r":
        return 17;
      case "s":
        return 18;
      case "t":
        return 19;
      case "u":
        return 20;
      case "v":
        return 21;
      case "x":
        return 22;
      case "y":
        return 23;
      case "f":
        return 24;
      case "j":
        return 25;
      case "w":
        return 26;
      case "z":
        return 27;
      default:
        return 0;
    }
  };

  const reduceToBelow80 = (number: number): number => {
    let result = number;
    while (result > 80) {
      result -= 80;
    }
    return result;
  };

  const findScore = () => {
    const firstNameFormat = normalizeString(firstName);
    const secondNameFormat = normalizeString(scendName);
    const lastNameFormat = normalizeString(lastName);
    const last1 = normalizeString(firstName).slice(-1);
    const last2 = normalizeString(scendName).slice(-1);
    const fullName = firstNameFormat + secondNameFormat + lastNameFormat;
    const scoreTC = [...fullName].reduce((result, item) => {
      return result + formatNumber(item);
    }, 0);
    const totalName = [...normalizeString(lastName)].reduce((result, item) => {
      return result + formatNumber(item);
    }, 0);
    const scoreDC = formatNumber(last1) + formatNumber(last2) + totalName;
    setScore(reduceToBelow80(scoreTC));
    setIsShowCard(true);
    setScoreDC(reduceToBelow80(scoreDC));
  };
  return (
    <div className="flex flex-col w-full bg-white min-h-screen items-center py-10">
      <h1 className="text-black text-4xl mb-16">Tính điểm tên</h1>
      <div className="flex flex-col items-center">
        <h1 className="text-black text-2xl">Bảng chữ cái</h1>
        <Image
          src="/image1.png"
          alt="Picture of the author"
          width={600}
          height={600}
        />
      </div>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-black text-2xl">Công thức tính</h1>
        <div className="font-bold">
          Tĩnh cục (TC) = Tổng họ + Tổng đệm + Tổng tên
        </div>
        <div>+/ Trường hợp không có đệm thì TC = Tổng họ + Tổng tên</div>
        <div>
          +/ Trường hợp có nhiều đệm thì TC = Tổng họ + Tổng đệm 1 + Tổng đệm 2
          +...Tổng tên
        </div>
        <div className="font-bold">
          Động cục (ĐC) = Chữ cuối họ + chữ cuối đệm + Tổng tên
        </div>
      </div>
      <div className="flex mt-10 w-1/2 gap-8 justify-center">
        <InputCustom
          value={firstName}
          setValue={setFirstName}
          label="Họ"
          placeholder="Nhập họ"
        />
        <InputCustom
          value={scendName}
          setValue={setSecondName}
          label="Tên đệm"
          placeholder="Nhập tên đệm"
        />
        <InputCustom
          value={lastName}
          setValue={setLastName}
          label="Tên"
          placeholder="Tên"
        />
      </div>
      <div className="mt-10 justify-center">
        <button
          className="px-[20px] py-[12px] rounded-2xl bg-blue-400 text-white cursor-pointer hover:opacity-80"
          onClick={findScore}
        >
          Tính điểm
        </button>
      </div>

      {isShowCard && (
        <>
          <div className="flex justify-around w-1/2 flex-col">
            <h1 className="text-black text-2xl">Tĩnh Cục</h1>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
              <div className="flex justify-between mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                <span className="text-base font-bold text-black">
                  Quẻ:{" "}
                  <span className={`text-base font-bold ${renderColor()}`}>
                    {data.find((item) => item.id === score.toString())?.type}
                  </span>
                </span>

                <span className={`text-base font-bold ${renderColor()}`}>
                  {score}
                </span>
              </div>

              <div className="p-4">
                <p className="text-slate-600 leading-normal font-light">
                  {data.find((item) => item.id === score.toString())?.value}
                </p>
              </div>
            </div>
            <h1 className="text-black text-2xl">Động Cục</h1>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
              <div className="flex justify-between mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                <span className="text-base font-bold text-black">
                  Quẻ:{" "}
                  <span className={`text-base font-bold ${renderColor()}`}>
                    {data.find((item) => item.id === scoreDC.toString())?.type}
                  </span>
                </span>

                <span className={`text-base font-bold ${renderColor()}`}>
                  {scoreDC}
                </span>
              </div>

              <div className="p-4">
                <p className="text-slate-600 leading-normal font-light">
                  {data.find((item) => item.id === scoreDC.toString())?.value}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
