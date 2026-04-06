"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { cn, formatKoreanPhone } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

const schema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone: z.string().regex(
    /^(01[016789]-?\d{3,4}-?\d{4}|02-?\d{3,4}-?\d{4}|0[3-9]\d-?\d{3,4}-?\d{4})$/,
    "올바른 전화번호를 입력해주세요"
  ),
  email: z.string().email("올바른 이메일을 입력해주세요").optional().or(z.literal("")),
  privacyConsent: z.literal(true, { message: "개인정보 수집에 동의해주세요" }),
  marketingConsent: z.boolean().optional(),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationSection() {
  const [policyOpen, setPolicyOpen] = useState(false);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", privacyConsent: false as unknown as true, marketingConsent: false, honeypot: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      await new Promise((r) => setTimeout(r, 1500));
      return { success: true };
    },
    onSuccess: () => { setDone(true); reset(); },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatKoreanPhone(e.target.value), { shouldValidate: true });
  };

  if (done) {
    return (
      <SectionWrapper id="registration" className="bg-neutral-50 dark:bg-[#0f0f0f]">
        <RevealOnScroll>
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-neutral-200 dark:border-neutral-700">
              <Check size={24} strokeWidth={1} />
            </div>
            <h3 className="heading-display text-2xl">등록 완료</h3>
            <p className="mt-4 text-sm text-neutral-500">
              관심고객 등록이 접수되었습니다. 빠른 시일 내 연락드리겠습니다.
            </p>
            <button
              onClick={() => setDone(false)}
              className="mt-8 border border-neutral-900 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.1em] transition hover:bg-neutral-900 hover:text-white dark:border-neutral-300 dark:hover:bg-white dark:hover:text-black"
            >
              추가 등록
            </button>
          </div>
        </RevealOnScroll>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="registration"
      title="관심고객 등록"
      subtitle="Registration"
      className="bg-neutral-50 dark:bg-[#0f0f0f]"
    >
      <RevealOnScroll>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="mx-auto max-w-lg">
          <input type="text" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("honeypot")} />

          {/* Name */}
          <div className="mb-6">
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-600 dark:text-neutral-400">
              이름 *
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className={cn(
                "w-full border-b bg-transparent pb-3 text-sm outline-none transition placeholder:text-neutral-300",
                errors.name ? "border-red-400" : "border-neutral-200 focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-white"
              )}
              {...register("name")}
            />
            {errors.name && <p className="mt-1.5 text-[11px] text-red-500">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-600 dark:text-neutral-400">
              연락처 *
            </label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              className={cn(
                "w-full border-b bg-transparent pb-3 text-sm outline-none transition placeholder:text-neutral-300",
                errors.phone ? "border-red-400" : "border-neutral-200 focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-white"
              )}
              value={watch("phone")}
              onChange={handlePhoneChange}
            />
            {errors.phone && <p className="mt-1.5 text-[11px] text-red-500">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-10">
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-600 dark:text-neutral-400">
              이메일 <span className="normal-case tracking-normal text-neutral-300">(선택)</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border-b border-neutral-200 bg-transparent pb-3 text-sm outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-white"
              {...register("email")}
            />
          </div>

          {/* Consent */}
          <div className="mb-10 border border-neutral-200 p-5 dark:border-neutral-800">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-neutral-900 dark:accent-white"
                {...register("privacyConsent")}
              />
              <span className="text-sm">
                <span className="font-medium">[필수]</span> 개인정보 수집 · 이용 동의
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="mt-2 text-[11px] text-red-500">{errors.privacyConsent.message}</p>
            )}

            <button
              type="button"
              onClick={() => setPolicyOpen(!policyOpen)}
              className="mt-3 flex items-center gap-1 text-[11px] text-neutral-400 transition hover:text-neutral-600"
            >
              약관 보기
              <ChevronDown size={12} className={cn("transition", policyOpen && "rotate-180")} />
            </button>
            {policyOpen && (
              <p className="mt-3 max-h-24 overflow-y-auto text-[11px] leading-relaxed text-neutral-400">
                수집항목: 이름, 연락처, 이메일(선택) | 수집목적: 분양 관련 정보 안내 및 상담 |
                보유기간: 수집일로부터 1년 | 동의를 거부할 권리가 있으며, 거부 시 관심고객 등록이 제한됩니다.
              </p>
            )}

            <label className="mt-4 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-neutral-900 dark:accent-white"
                {...register("marketingConsent")}
              />
              <span className="text-sm text-neutral-500">
                <span className="font-medium">[선택]</span> 마케팅 정보 수신 동의
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={cn(
              "group flex w-full items-center justify-center gap-3 py-4 text-[12px] font-medium uppercase tracking-[0.15em] transition-all",
              mutation.isPending
                ? "cursor-wait bg-neutral-300 text-neutral-500"
                : "bg-accent text-white hover:bg-accent-dark"
            )}
          >
            {mutation.isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border border-neutral-500 border-t-transparent" />
                접수 중
              </>
            ) : (
              <>
                관심고객 등록
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {mutation.isError && (
            <p className="mt-4 text-center text-[11px] text-red-500">
              오류가 발생했습니다. 다시 시도해주세요.
            </p>
          )}
        </form>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
