import type { WikiCategory, CategoryData } from "@/types/hierarchical.editor.types"
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
  const handleUpdate = (data: unknown) => {
    onCategoryDataChange({
      ...categoryData,
      data
    });
  };

  switch (category) {
    case 'lp':
      return (
        <LPForm 
          data={categoryData.data as { infobox: unknown; tracklist: unknown }}
          onUpdate={handleUpdate}
        />
      );
    
    case 'equipment':
      return (
        <EquipmentForm 
          data={categoryData.data as unknown}
          onUpdate={handleUpdate}
        />
      );
    
    case 'artist':
      return (
        <ArtistForm 
          data={categoryData.data as unknown}
          onUpdate={handleUpdate}
        />
      );
    
    case 'other':
      return (
        <OtherForm 
          data={categoryData.data as unknown}
          onUpdate={handleUpdate}
        />
      );
    
    default:
      return null;
  }
} 