import type { 
  ArtistInfo, 
  ArtistRole, 
  DiscographyItem, 
  ActivityItem, 
  CategoryFormProps 
} from "@/types/hierarchical.editor.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { Input } from "@/components/Input"
import { Select } from "@/components"
import { Button } from "@/components/Button"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { useState } from "react"
import { nanoid } from "nanoid"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';

type ArtistFormProps = CategoryFormProps<ArtistInfo>;

const ARTIST_ROLES: { value: ArtistRole; label: string }[] = [
  { value: 'composer', label: '작곡가' },
  { value: 'singer', label: '가수' },
  { value: 'group', label: '그룹' },
  { value: 'producer', label: '프로듀서' },
  { value: 'arranger', label: '편곡가' },
  { value: 'instrumentalist', label: '연주자' },
  { value: 'other', label: '기타' }
];

const RELEASE_TYPES = ['앨범', '싱글', 'EP', '컴필레이션', '라이브', '리믹스', '기타'];
const ACTIVITY_TYPES = ['데뷔', '수상', '콘서트', '앨범 발매', '해체', '재결합', '기타'];

// 정렬 가능한 디스코그래피 아이템 컴포넌트
interface SortableDiscographyItemProps {
  item: DiscographyItem;
  onEdit: (item: DiscographyItem) => void;
  onDelete: (id: string) => void;
}

function SortableDiscographyItem({ item, onEdit, onDelete }: SortableDiscographyItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label={`디스코그래피 항목 순서 변경: ${item.title} (스페이스로 잡기, 화살표로 이동)`}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="font-medium">{item.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {item.releaseDate} • {item.type} • {item.role}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// 정렬 가능한 활동 이력 아이템 컴포넌트
interface SortableActivityItemProps {
  item: ActivityItem;
  onEdit: (item: ActivityItem) => void;
  onDelete: (id: string) => void;
}

function SortableActivityItem({ item, onEdit, onDelete }: SortableActivityItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label={`활동 이력 항목 순서 변경: ${item.title} (스페이스로 잡기, 화살표로 이동)`}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <div className="font-medium">{item.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {item.year} • {item.type}
          </div>
          <div className="text-sm mt-1">{item.description}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function ArtistForm({ data, onUpdate }: ArtistFormProps) {
  const [editingDiscography, setEditingDiscography] = useState<DiscographyItem | null>(null);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [activeDiscography, setActiveDiscography] = useState<DiscographyItem | null>(null);
  const [activeActivity, setActiveActivity] = useState<ActivityItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFieldChange = (field: keyof ArtistInfo, value: unknown) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleRoleToggle = (role: ArtistRole) => {
    const updatedRoles = data.roles.includes(role)
      ? data.roles.filter(r => r !== role)
      : [...data.roles, role];
    handleFieldChange("roles", updatedRoles);
  };

  const handleAddDiscography = () => {
    const newItem: DiscographyItem = {
      id: nanoid(),
      title: '',
      releaseDate: '',
      type: '',
      role: ''
    };
    setEditingDiscography(newItem);
  };

  const handleSaveDiscography = (item: DiscographyItem) => {
    const updatedDiscography = editingDiscography
      ? data.discography.map(d => d.id === item.id ? item : d)
      : [...data.discography, item];
    handleFieldChange("discography", updatedDiscography);
    setEditingDiscography(null);
  };

  const handleDeleteDiscography = (id: string) => {
    const updatedDiscography = data.discography.filter(d => d.id !== id);
    handleFieldChange("discography", updatedDiscography);
  };

  const handleAddActivity = () => {
    const newItem: ActivityItem = {
      id: nanoid(),
      year: '',
      title: '',
      description: '',
      type: ''
    };
    setEditingActivity(newItem);
  };

  const handleSaveActivity = (item: ActivityItem) => {
    const updatedActivities = editingActivity
      ? data.activities.map(a => a.id === item.id ? item : a)
      : [...data.activities, item];
    handleFieldChange("activities", updatedActivities);
    setEditingActivity(null);
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = data.activities.filter(a => a.id !== id);
    handleFieldChange("activities", updatedActivities);
  };

  const handleDiscographyDragStart = (event: DragStartEvent) => {
    setActiveDiscography(data.discography.find((d) => d.id === event.active.id) || null);
  };

  const handleDiscographyDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDiscography(null);
    if (over && active.id !== over.id) {
      const oldIndex = data.discography.findIndex((item) => item.id === active.id);
      const newIndex = data.discography.findIndex((item) => item.id === over.id);
      const updatedDiscography = arrayMove(data.discography, oldIndex, newIndex);
      handleFieldChange("discography", updatedDiscography);
    }
  };

  const handleActivityDragStart = (event: DragStartEvent) => {
    setActiveActivity(data.activities.find((a) => a.id === event.active.id) || null);
  };

  const handleActivityDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveActivity(null);
    if (over && active.id !== over.id) {
      const oldIndex = data.activities.findIndex((item) => item.id === active.id);
      const newIndex = data.activities.findIndex((item) => item.id === over.id);
      const updatedActivities = arrayMove(data.activities, oldIndex, newIndex);
      handleFieldChange("activities", updatedActivities);
    }
  };

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="artist-name">이름</label>
              <Input
                id="artist-name"
                value={data.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="아티스트명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="artist-country">국가</label>
              <Input
                id="artist-country"
                value={data.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                placeholder="국가를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="artist-activePeriod">활동 기간</label>
              <Input
                id="artist-activePeriod"
                value={data.activePeriod}
                onChange={(e) => handleFieldChange("activePeriod", e.target.value)}
                placeholder="예: 1990-현재, 2005-2015"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="artist-imageUrl">이미지 URL</label>
              <Input
                id="artist-imageUrl"
                value={data.imageUrl}
                onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
                placeholder="이미지 URL을 입력하세요"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">아티스트 분류</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {ARTIST_ROLES.map(role => (
                <button
                  key={role.value}
                  onClick={() => handleRoleToggle(role.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    data.roles.includes(role.value)
                      ? 'bg-lavender-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 디스코그래피 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">디스코그래피</CardTitle>
          <Button onClick={handleAddDiscography} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDiscographyDragStart}
            onDragEnd={handleDiscographyDragEnd}
          >
            <SortableContext
              items={data.discography.map((d) => d.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {data.discography.map((item) => (
                  <SortableDiscographyItem
                    key={item.id}
                    item={item}
                    onEdit={setEditingDiscography}
                    onDelete={handleDeleteDiscography}
                  />
                ))}
              </div>
            </SortableContext>
            {typeof window !== 'undefined' &&
              createPortal(
                <DragOverlay>
                  {activeDiscography && (
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg opacity-80">
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium">{activeDiscography.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activeDiscography.releaseDate} • {activeDiscography.type} • {activeDiscography.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DragOverlay>,
                document.body,
              )}
          </DndContext>
          
          {data.discography.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              디스코그래피가 없습니다. 추가해보세요!
            </div>
          )}
        </CardContent>
      </Card>

      {/* 활동 이력 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">활동 이력</CardTitle>
          <Button onClick={handleAddActivity} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleActivityDragStart}
            onDragEnd={handleActivityDragEnd}
          >
            <SortableContext
              items={data.activities.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {data.activities.map((item) => (
                  <SortableActivityItem
                    key={item.id}
                    item={item}
                    onEdit={setEditingActivity}
                    onDelete={handleDeleteActivity}
                  />
                ))}
              </div>
            </SortableContext>
            {typeof window !== 'undefined' &&
              createPortal(
                <DragOverlay>
                  {activeActivity && (
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg opacity-80">
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium">{activeActivity.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activeActivity.year} • {activeActivity.type}
                          </div>
                          <div className="text-sm mt-1">{activeActivity.description}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </DragOverlay>,
                document.body,
              )}
          </DndContext>
          
          {data.activities.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              활동 이력이 없습니다. 추가해보세요!
            </div>
          )}
        </CardContent>
      </Card>

      {/* 디스코그래피 편집 모달 - Dialog */}
      <Dialog open={!!editingDiscography} onOpenChange={(open) => !open && setEditingDiscography(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>디스코그래피 편집</DialogTitle>
          </DialogHeader>
          {editingDiscography && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <Input
                    value={editingDiscography.title}
                    onChange={(e) => setEditingDiscography({...editingDiscography, title: e.target.value})}
                    placeholder="앨범/싱글 제목"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">발매일</label>
                  <Input
                    type="date"
                    value={editingDiscography.releaseDate}
                    onChange={(e) => setEditingDiscography({...editingDiscography, releaseDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">유형</label>
                <Select
                  value={editingDiscography.type}
                  onChange={(e) => setEditingDiscography({...editingDiscography, type: e.target.value})}
                  aria-label="디스코그래피 유형"
                >
                  <option value="">유형 선택</option>
                  {RELEASE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">역할</label>
                  <Input
                    value={editingDiscography.role}
                    onChange={(e) => setEditingDiscography({...editingDiscography, role: e.target.value})}
                    placeholder="작곡, 작사, 프로듀싱 등"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => handleSaveDiscography(editingDiscography)}
                  className="flex-1"
                >
                  저장
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingDiscography(null)}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 활동 이력 편집 모달 - Dialog */}
      <Dialog open={!!editingActivity} onOpenChange={(open) => !open && setEditingActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>활동 이력 편집</DialogTitle>
          </DialogHeader>
          {editingActivity && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">연도</label>
                  <Input
                    value={editingActivity.year}
                    onChange={(e) => setEditingActivity({...editingActivity, year: e.target.value})}
                    placeholder="예: 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <Input
                    value={editingActivity.title}
                    onChange={(e) => setEditingActivity({...editingActivity, title: e.target.value})}
                    placeholder="활동 제목"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">유형</label>
                <Select
                  value={editingActivity.type}
                  onChange={(e) => setEditingActivity({...editingActivity, type: e.target.value})}
                  aria-label="활동 이력 유형"
                >
                  <option value="">유형 선택</option>
                  {ACTIVITY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">설명</label>
                  <textarea
                    value={editingActivity.description}
                    onChange={(e) => setEditingActivity({...editingActivity, description: e.target.value})}
                    placeholder="활동에 대한 설명"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavender-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => handleSaveActivity(editingActivity)}
                  className="flex-1"
                >
                  저장
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingActivity(null)}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 