import type { 
  WikiCategory, 
  CategoryData, 
  InfoboxData, 
  TracklistData, 
  EquipmentInfo, 
  ArtistInfo, 
  OtherInfo 
} from "@/types/hierarchical.editor.types"
import { LPForm } from "./forms/LPForm"
import { EquipmentForm } from "./forms/EquipmentForm"
import { ArtistForm } from "./forms/ArtistForm"
import { OtherForm } from "./forms/OtherForm"

interface CategoryFormSelectorProps {
  category: WikiCategory;
  categoryData: CategoryData;
  onCategoryDataChange: (data: CategoryData) => void;
}

export function CategoryFormSelector({ 
  category, 
  categoryData, 
  onCategoryDataChange 
}: CategoryFormSelectorProps) {
  const handleLPUpdate = (data: { infobox: InfoboxData; tracklist: TracklistData }) => {
    onCategoryDataChange({
      type: 'lp',
      data
    });
  };

  const handleEquipmentUpdate = (data: EquipmentInfo) => {
    onCategoryDataChange({
      type: 'equipment',
      data
    });
  };

  const handleArtistUpdate = (data: ArtistInfo) => {
    onCategoryDataChange({
      type: 'artist',
      data
    });
  };

  const handleOtherUpdate = (data: OtherInfo) => {
    onCategoryDataChange({
      type: 'other',
      data
    });
  };

  switch (category) {
    case 'lp':
      return (
        <LPForm 
          data={categoryData.data as { infobox: InfoboxData; tracklist: TracklistData }}
          onUpdate={handleLPUpdate}
        />
      );
    
    case 'equipment':
      return (
        <EquipmentForm 
          data={categoryData.data as EquipmentInfo}
          onUpdate={handleEquipmentUpdate}
        />
      );
    
    case 'artist':
      return (
        <ArtistForm 
          data={categoryData.data as ArtistInfo}
          onUpdate={handleArtistUpdate}
        />
      );
    
    case 'other':
      return (
        <OtherForm 
          data={categoryData.data as OtherInfo}
          onUpdate={handleOtherUpdate}
        />
      );
    
    default:
      return null;
  }
} 