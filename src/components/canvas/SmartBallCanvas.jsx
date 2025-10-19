import React, { useState, useEffect } from "react";
import BallCanvas from "./Ball";
import MobileBallCanvas from "./MobileBall";
import SimpleBall from "./SimpleBall";

const SmartBallCanvas = ({ icon, name }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se está no browser
    if (typeof window === 'undefined') {
      console.log('SSR - usando SimpleBall como fallback');
      setIsMobile(true);
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    // Detecta mobile
    const checkMobile = () => {
      return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Detecta WebGL
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        console.log('WebGL não suportado:', e);
        return false;
      }
    };

    // Detecta performance do dispositivo
    const checkPerformance = () => {
      // Verifica se é um dispositivo de baixo desempenho
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
      const isOldDevice = /Android [1-4]|iPhone OS [1-9]|iPad OS [1-9]/i.test(navigator.userAgent);
      return isLowEnd || isOldDevice;
    };

    const mobile = checkMobile();
    const webgl = checkWebGL();
    const lowPerformance = checkPerformance();

    console.log('Detecção de dispositivo:', { mobile, webgl, lowPerformance });

    setIsMobile(mobile);
    setWebglSupported(webgl);
    setIsLoading(false);

    // Se for mobile E (WebGL não suportado OU baixo desempenho), usa versão simples
    if (mobile && (!webgl || lowPerformance)) {
      console.log('Usando SimpleBall - Mobile sem WebGL ou baixo desempenho');
    }
    // Se for mobile mas WebGL suportado, usa versão otimizada
    else if (mobile) {
      console.log('Usando MobileBallCanvas - Mobile com WebGL');
    }
    // Desktop usa versão original
    else {
      console.log('Usando BallCanvas - Desktop');
    }
  }, []);

  if (isLoading) {
    return <div className="w-28 h-28 flex items-center justify-center">Loading...</div>;
  }

  // Se for mobile E (WebGL não suportado OU baixo desempenho), usa versão simples
  if (isMobile && !webglSupported) {
    return <SimpleBall icon={icon} name={name} />;
  }

  // Se for mobile mas WebGL suportado, usa versão otimizada
  if (isMobile) {
    return <MobileBallCanvas icon={icon} />;
  }

  // Desktop usa versão original
  return <BallCanvas icon={icon} />;
};

export default SmartBallCanvas;
