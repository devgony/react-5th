import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Info() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="fixed top-3 right-1 size-8 z-100">
        <InformationCircleIcon className="hover:text-cyan-400 animate-bounce hover:animate-none z-100" />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>구현 내용</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            <h1 className="font-bold">기본 기능</h1>
            <p>
              ✅ Detail Page (/list/[id]): 베스트셀러 각 카테고리별 책의
              리스트를 보여주세요.
            </p>
            <p>✅ About Page (/about): About 페이지 입니다.</p>
            <p>✅ Layout Component 를 사용하세요.</p>
            <p>✅ CSS Modules를 이용하여 예쁘게 꾸며주세요.</p>
            <p>✅ Vercel 로 배포하세요</p>

            <h1 className="font-bold mt-2">추가 구현 기능</h1>
            <p>✅ Category Search 구현</p>
            <p>✅ updated field 에 대한 필터 선택 구현</p>
            <p>✅ Theme 적용 및 dark mode 고정</p>
            <p>
              ✅ 컨텐츠의 horizontal width 고정을 위한 custom scrollbar 구현
            </p>
            <p>
              ✅ categoryState 선택 안된 경우 Books tab 클릭 시 toast error 구현
            </p>
            <p>✅ Category hover 시 bound animation 적용</p>
            <p>
              ✅ Recoil 통해 선택된 category를 global state로 관리하여 기존선택
              cache 및 Books tab 선택 활성화
            </p>
            <p>✅ Tab 변경 시마다 하단 바 애니메이션 구현</p>
            <p>✅ NextJS font 적용</p>
            <p>✅ await 에 대한 loading 처리 완료</p>
            <p>✅ 기본기능 + 추가구현에 대한 information dialog 구현</p>
            <p>✅ Search 에 대한 No results found 처리 thanks to NN</p>
            <p>✅ 상단 Tab은 Sticky, Info 는 fixed 처리하여 항상 보이게 수정</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
