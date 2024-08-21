import React, {useEffect, useRef, useState, useCallback} from 'react';
import HomePageGameCard from '../components/home/HomePageGameCard.js';
import styled from 'styled-components';
import spectreLogo from '../assets/spectreCard.jpg';
import valorantLogo from '../assets/valorantCard.png';
import placeholderImg from '../assets/placeholder.png';
import CashMatchesImg from '../assets/Gameside_CashMatches.webp';
import HomePageValorantImg from '../assets/HomePageValorant.png';
import HomePageSpectreImg from '../assets/HomePageSpectre.jpg';
import NewPrimaryButton from '../custom_components/NewPrimaryButton.js';
import useEmblaCarousel from 'embla-carousel-react';

const HomeWrapper = styled.div`
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100% - 64px);
  scroll-snap-type: y mandatory;
  width: 100%;
  overflow: hidden;
  justify-content: start;
`;

const Home = () => {
  const endScrollViewRef = useRef(null);
  const games = [
    {name: 'Spectre Divide', poster:spectreLogo},
    {name: 'Valorant', poster: valorantLogo},
  ];
  
  useEffect(() => {
    // Set the initial scroll position to the maximum value
    if (endScrollViewRef.current) {
      endScrollViewRef.current.scrollLeft = endScrollViewRef.current.scrollWidth;
    }
  }, []);


  return (
    <div className="relative w-full min-h-screen lg:mt-[120px]">
    <HomeWrapper>
      <ResponsiveSlider games={games} />
      <div className="w-full bg-[#242527] rounded-3xl p-[30px] mt-[120px] flex-wrap flex flex-col lg:!flex-row lg:items-center gap-[50px]">
        <div className="font-['Manrope'] flex flex-col w-full items-center lg:w-full">
          <div className="font-extrabold text-[32px] leading-[43.71px]">Choose your game</div>
          <div className="text-base leading-[21.86px] mt-2">Earn cash while competing to be the top</div>
        </div>
        <div className="flex flex-col lg:!flex-row w-full gap-[50px] lg-gap-[175px] justify-center items-center">
          <div className="relative w-full h-[178px] sm:!w-[423px] sm:h-[252px] lg:w-auto">
            <HomePageGameCard gameName={'Valorant'} posterSrc={HomePageValorantImg} overlay />
          </div>
          <div className="relative w-full h-[178px] sm:!w-[423px] sm:h-[252px] lg:w-auto">
            <HomePageGameCard gameName={'Spectre'} posterSrc={HomePageSpectreImg} overlay />
          </div>
        </div>
      </div>
      <div className="transition-all flex flex-col lg:!flex-row mt-[50px] min-[500px]:px-[50px] lg:gap-[98px] shrink-0 lg:ml-auto lg:mr-auto grow w-full max-w-[1380px]">
        <div className="gap-[30px] font-['Manrope'] flex flex-col max-lg:w-full max-lg:items-center max-lg:text-center justify-center">
          <div className="font-extrabold text-[32px] leading-[43.71px]">Monthly leaderboard rewards</div>
          <div className="text-base leading-[21.86px]">Earn rewards by placing in the monthly leaderboard</div>
            <div className="justify-start hidden lg:!flex">
              <NewPrimaryButton
                backgroundColor="#E72953"
                label={"Check Leaderboard"}
                onClick={()=>{}}
                fullwidth={false}
                mobileSmall
              >
              </NewPrimaryButton>
            </div>
        </div>
        <div className="transition-all leaderboardCards flex justify-between md:justify-around mt-[225px] sm:mt-[150px] grow">
          <div className="bg-[#242527] shrink-0 rounded-xl font-['Manrope'] w-[200px] h-[190px] flex flex-col gap-3 items-center justify-center">
            <div className="rounded-full bg-[#A1A1A1] w-[84px] h-[84px]"></div>
            <div className="font-bold flex gap-3"><span className="text-[#E72953]">#2</span><span>Name</span></div>
            <div className="rounded-full">#200</div>
          </div>
          <div className="bg-[#242527] z-10 mt-[-150px] sm:mt-[-75px] ml-[-100px] shrink-0 rounded-xl font-['Manrope'] w-[200px] h-[190px] flex flex-col gap-3 items-center justify-center">
            <div className="rounded-full bg-[#A1A1A1] w-[84px] h-[84px]"></div>
            <div className="font-bold flex gap-3"><span className="text-[#E72953]">#1</span><span>Name</span></div>
            <div className="rounded-full">#200</div>
          </div>
          <div className="bg-[#242527] z-20 ml-[-100px] shrink-0 rounded-xl font-['Manrope'] w-[200px] h-[190px] flex flex-col gap-3 items-center justify-center">
            <div className="rounded-full bg-[#A1A1A1] w-[84px] h-[84px]"></div>
            <div className="font-bold flex gap-3"><span className="text-[#E72953]">#3</span><span>Name</span></div>
            <div className="rounded-full">#200</div>
          </div>
        </div>
      </div>
    </HomeWrapper>
    </div>
  );
};

export default Home;

const ResponsiveSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <>
    <div className="flex flex-col w-full px-4 sm:px-[50px] max-lg:mt-[100px]">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {/* <div className="embla__slide flex-none w-full">
            <div className="flex flex-col lg:!flex-row gap-[60px] lg:gap-[181px] lg:justify-center">

              <div className="gap-[20px] font-['Manrope'] flex flex-col">
                <div className="font-extrabold text-5xl leading-[76.8px]">Free To Enter</div>
                <div className="font-extrabold text-5xl leading-[76.8px]">Tournaments</div>
                <div className="text-base leading-[21.86px]">Reach the top, claim the title!</div>
                <div className="flex justify-start">
                  <NewPrimaryButton
                    backgroundColor="#E72953"
                    label={"Play now"}
                    onClick={()=>{}}
                    fullwidth={false}
                    mobileSmall
                  >
                  </NewPrimaryButton>
                </div>
              </div>

              <div className="relative w-full h-[184.569px] sm:h-[378px] max-w-[360px] sm:max-w-full lg:max-w-[579px]">
                <div className="absolute top-0 left-0 w-[200px] sm:w-[400px] h-[118.5px] sm:h-[237px]">
                  <HomePageGameCard posterSrc={placeholderImg} />
                </div>
                <div className="absolute bottom-0 right-0 w-[200px] sm:w-[400px] h-[118.5px] sm:h-[237px]">
                  <HomePageGameCard posterSrc={placeholderImg} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="embla__slide flex-none w-full mr-[1px]">
            <div className="flex flex-col lg:!flex-row gap-[60px] lg:gap-[181px] lg:justify-center">
      
              <div className="gap-[20px] font-['Manrope'] flex flex-col">
                <div className="font-extrabold text-5xl leading-[76.8px]">Cash</div>
                <div className="font-extrabold text-5xl leading-[76.8px]">Matches</div>
                <div className="text-base leading-[21.86px]">Play your favorite games!</div>
                <div className="flex justify-start">
                  <NewPrimaryButton
                    backgroundColor="#E72953"
                    label={"Play now"}
                    onClick={()=>{}}
                    fullwidth={false}
                    mobileSmall
                  >
                  </NewPrimaryButton>
                </div>
              </div>
      
              <div className="w-full h-[184.569px] sm:h-[332px] sm:max-w-[590px]">
                <HomePageGameCard posterSrc={CashMatchesImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className={`w-[33%] max-w-[141px] h-[10px] mx-2 rounded-full ${0 === selectedIndex ? 'bg-white' : 'bg-[#494949]'}`}
          onClick={() => emblaApi.scrollTo(0)}
        />
        <button
          type="button"
          className={`w-[33%] max-w-[141px] h-[10px] mx-2 rounded-full ${1 === selectedIndex ? 'bg-white' : 'bg-[#494949]'}`}
          onClick={() => emblaApi.scrollTo(1)}
        />
      </div>
    </div> */}
    </>
  );
};
