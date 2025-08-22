'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@site/src/components/ui/carousel"
import { Card, CardContent } from "@site/src/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef, useState } from "react"


interface Client {
  name: string;
  logo: string;
  website: string;
  summary: string;
  fullDescription: string;
}

const clients: Client[] = [
  {
    name: 'California DOGE',
    logo: '/img/cali-doge.png',
    website: 'https://cali-doge.org/',
    summary: 'Independent platform for government transparency. With over 30M records in our database and 400+ hours of research, we provide unprecedented access to California government operations, programs, and spending data',
    fullDescription: 'Our CA DOGE platform helps you discover hidden taxes, track government efficiency, and understand how your tax dollars are being spent. Unlike other transparency platforms, we focus exclusively on California, delivering detailed insights into state and local government operations.',
  },
  {
    name: 'DOGE Network',
    logo: '/img/doge-network.png',
    website: 'https://dogenetwork.org/',
    summary: 'Independent platform for government transparency. With over 30M records in our database and 400+ hours of research, we provide unprecedented access to California government operations, programs, and spending data',
    fullDescription: 'created the DOGE Network organization at github.com/DOGE-network. The California DOGE codebase is both for California State government data research and as a template for other states to follow. Code is publicly licensed as Apache 2.0 and CC-BY.Share with your networks, so we can get some developers from other states to create their own DOGE sites starting from the template. Follow the organization and star the repositories to get notified of changes. You can also follow on twitter https://x.com/cali_doge.',
  },
  {
    name: 'West Virginia Wire',
    logo: '/img/west-virginia-wire.jpg',
    website: 'https://www.youtube.com/@westvirginiawire',
    summary: 'Welcome to West Virginia Wire, where we explore a variety of topics designed to inform, inspire, and engage! Whether you\'re looking for insightful Bible studies, thought-provoking book readings, honest reaction videos, or the latest updates on local state news, you\'ll find it here. We also dive into current political events, offering perspectives and discussions that keep you informed on the issues that matter. Subscribe to stay-up-to-date with engaging content that encourages learning, reflection',
    fullDescription: '',
  },
];

export default function ClientCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      playOnInit: true,
    })
  )

  useEffect(() => {
    if (!api) return
    
    // Make sure autoplay continues working properly
    const onSelect = () => {
      // Ensure autoplay continues smoothly
      if (autoplayRef.current) {
        autoplayRef.current.reset()
      }
    }
    
    api.on('select', onSelect)
    
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section id="clients" style={{ padding: '4px 0', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: false,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
          plugins={[autoplayRef.current]}
          setApi={setApi}
          style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}
        >
          <CarouselContent style={{ display: 'flex', gap: '16px', padding: '0 16px' }}>
            {clients.map((client) => (
              <CarouselItem key={client.name} style={{ 
                flex: '0 0 calc(33.333% - 11px)', 
                minWidth: '250px',
                maxWidth: '280px',
                position: 'relative'
              }}>
                <div style={{ width: '100%' }}>
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    onMouseEnter={() => setHoveredClient(client.name)}
                    onMouseLeave={() => setHoveredClient(null)}
                  >
                    <Card style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px', 
                      boxShadow: hoveredClient === client.name ? '0 4px 12px 0 rgba(0, 0, 0, 0.15)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      width: '100%',
                      transform: hoveredClient === client.name ? 'translateY(-2px)' : 'translateY(0)'
                    }}>
                      <CardContent style={{ 
                        padding: '32px 16px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '128px'
                      }}>
                        <img
                          src={client.logo}
                          alt={client.name}
                          style={{ height: '96px', width: 'auto', objectFit: 'contain' }}
                        />
                      </CardContent>
                    </Card>
                  </a>
                  
                  {/* Hover popup tooltip - positioned outside the card */}
                  {hoveredClient === client.name && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
                      padding: '16px',
                      marginBottom: '12px',
                      minWidth: '280px',
                      maxWidth: '320px',
                      zIndex: 1000,
                      pointerEvents: 'none'
                    }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#111827', 
                        textAlign: 'center',
                        marginBottom: '8px'
                      }}>
                        {client.name}
                      </h3>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#374151', 
                        textAlign: 'center',
                        lineHeight: '1.4'
                      }}>
                        {client.summary}
                      </p>
                      
                      {/* Arrow pointing down to the card */}
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: '8px solid white'
                      }} />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}