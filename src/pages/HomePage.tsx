import React from 'react';
import { Hero } from '../components/Hero.tsx';
import { CategoryCards } from '../components/CategoryCards.tsx';
import { RecentMedia } from '../components/RecentMedia.tsx';
import { ClassGrid } from '../components/ClassGrid.tsx';
import { CallToActionBanner } from '../components/CallToActionBanner.tsx';
import { GradeLevel } from '../types/index.ts';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleSearch = (query: string) => {
    onNavigate(`/pencarian?q=${encodeURIComponent(query)}`);
  };

  const handleSelectGrade = (grade: GradeLevel) => {
    onNavigate(`/pencarian?grade=${grade}`);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Section */}
      <Hero onSearch={handleSearch} />

      {/* 2. 5 Main Category Cards */}
      <CategoryCards onNavigate={onNavigate} />

      {/* 3. Media Terbaru & Koleksi Berdasarkan Kelas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Media Terbaru (approx 65% width) */}
          <div className="lg:col-span-8">
            <RecentMedia onNavigate={onNavigate} />
          </div>

          {/* Koleksi Berdasarkan Kelas (approx 35% width) */}
          <div className="lg:col-span-4">
            <ClassGrid 
              onSelectGrade={handleSelectGrade}
              onViewAll={() => onNavigate('/pencarian')}
            />
          </div>

        </div>
      </div>

      {/* 4. Banner Ajakan Belajar */}
      <CallToActionBanner onNavigate={onNavigate} />
    </div>
  );
};
