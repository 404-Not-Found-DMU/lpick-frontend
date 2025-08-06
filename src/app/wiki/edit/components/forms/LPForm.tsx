import type { InfoboxData, TracklistData, CategoryFormProps } from "@/types/hierarchical.editor.types"
import { InfoboxForm } from "./InfoboxForm"
import { TracklistForm } from "./TracklistForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { ClientOnly } from "@/components"

type LPFormData = {
  infobox: InfoboxData;
  tracklist: TracklistData;
};

type LPFormProps = CategoryFormProps<LPFormData>;

export function LPForm({ data, onUpdate }: LPFormProps) {
  const handleInfoboxUpdate = (infobox: InfoboxData) => {
    onUpdate({ ...data, infobox });
  };

  const handleTracklistUpdate = (tracklist: TracklistData) => {
    onUpdate({ ...data, tracklist });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoboxForm 
            data={data.infobox} 
            onUpdate={handleInfoboxUpdate} 
          />
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">트랙리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientOnly fallback={<div className="space-y-3">트랙리스트 로딩 중...</div>}>
            <TracklistForm 
              data={data.tracklist} 
              onUpdate={handleTracklistUpdate} 
            />
          </ClientOnly>
        </CardContent>
      </Card>
    </div>
  );
} 