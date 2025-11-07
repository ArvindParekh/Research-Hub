-- CreateEnum
CREATE TYPE "PaperStatus" AS ENUM ('Draft', 'UnderReview', 'Published', 'Withdrawn');

-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('Peer', 'Community');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('Remote', 'Hybrid', 'Onsite');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('PhD', 'Postdoc', 'Faculty', 'ResearchScientist', 'ResearchAssistant', 'ResearchEngineer', 'LabManager', 'Internship', 'Visiting', 'Other');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Open', 'Closed', 'Filled', 'Expired');

-- CreateEnum
CREATE TYPE "SalaryPeriod" AS ENUM ('Annual', 'Monthly', 'Hourly');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Submitted', 'UnderReview', 'Shortlisted', 'Interviewing', 'Offered', 'Accepted', 'Rejected', 'Withdrawn');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('Text', 'Image', 'Link', 'Publication', 'Event', 'Job', 'Paper', 'Poll');

-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('Public', 'Connections', 'Private');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('Like', 'Celebrate', 'Insightful', 'Support');

-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('Image', 'Video', 'Document', 'Link');

-- CreateEnum
CREATE TYPE "ShareTarget" AS ENUM ('Feed', 'Message', 'External');

-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('Direct', 'Channel');

-- CreateEnum
CREATE TYPE "ChannelMemberRole" AS ENUM ('Member', 'Moderator', 'Admin');

-- CreateTable
CREATE TABLE "RepositoryPaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "categoryId" TEXT,
    "status" "PaperStatus" NOT NULL DEFAULT 'Draft',
    "currentVersion" TEXT,
    "currentPdfUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "citations" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION,
    "publicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "RepositoryPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositoryPaperAuthor" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "affiliation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepositoryPaperAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperVersion" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "changelog" TEXT,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaperVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperReview" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT,
    "reviewerName" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "notHelpfulCount" INTEGER NOT NULL DEFAULT 0,
    "reviewType" "ReviewType" NOT NULL DEFAULT 'Community',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperKeyword" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperBookmark" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaperBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewHelpfulVote" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isHelpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewHelpfulVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperCitation" (
    "id" TEXT NOT NULL,
    "fromPaperId" TEXT NOT NULL,
    "toPaperId" TEXT,
    "toPublicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaperCitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "responsibilities" TEXT,
    "qualifications" TEXT,
    "organizationName" TEXT NOT NULL,
    "department" TEXT,
    "organizationLogo" TEXT,
    "organizationWebsite" TEXT,
    "location" TEXT,
    "workMode" "WorkMode",
    "type" "JobType" NOT NULL,
    "field" TEXT,
    "salaryMin" DECIMAL(65,30),
    "salaryMax" DECIMAL(65,30),
    "currency" TEXT,
    "salaryPeriod" "SalaryPeriod",
    "applicationDeadline" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "posterId" TEXT,
    "contactEmail" TEXT,
    "applicationUrl" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'Open',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "applicationCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Submitted',
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "additionalDocuments" TEXT[],
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "availableFrom" TIMESTAMP(3),
    "notes" TEXT,
    "employerNotes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobBookmark" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT,
    "type" "PostType" NOT NULL DEFAULT 'Text',
    "visibility" "PostVisibility" NOT NULL DEFAULT 'Public',
    "sharedPublicationId" TEXT,
    "sharedEventId" TEXT,
    "sharedJobId" TEXT,
    "sharedPaperId" TEXT,
    "originalPostId" TEXT,
    "isQuote" BOOLEAN NOT NULL DEFAULT false,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "bookmarkCount" INTEGER NOT NULL DEFAULT 0,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReaction" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL DEFAULT 'Like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentCommentId" TEXT,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentReaction" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL DEFAULT 'Like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostMention" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostMention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostHashtag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "postCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostHashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostAttachment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "altText" TEXT,
    "linkTitle" TEXT,
    "linkDescription" TEXT,
    "linkImage" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostBookmark" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostShare" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sharedWith" "ShareTarget",
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "type" "ConversationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationParticipant" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReadAt" TIMESTAMP(3),

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "conversationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelMember" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ChannelMemberRole" DEFAULT 'Member',
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReadAt" TIMESTAMP(3),

    CONSTRAINT "ChannelMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaperKeywordToRepositoryPaper" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaperKeywordToRepositoryPaper_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_JobToJobCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JobToJobCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PostToPostHashtag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToPostHashtag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryPaper_publicationId_key" ON "RepositoryPaper"("publicationId");

-- CreateIndex
CREATE INDEX "RepositoryPaper_categoryId_idx" ON "RepositoryPaper"("categoryId");

-- CreateIndex
CREATE INDEX "RepositoryPaper_status_idx" ON "RepositoryPaper"("status");

-- CreateIndex
CREATE INDEX "RepositoryPaper_createdAt_idx" ON "RepositoryPaper"("createdAt");

-- CreateIndex
CREATE INDEX "RepositoryPaper_submittedAt_idx" ON "RepositoryPaper"("submittedAt");

-- CreateIndex
CREATE INDEX "RepositoryPaper_averageRating_idx" ON "RepositoryPaper"("averageRating");

-- CreateIndex
CREATE INDEX "RepositoryPaperAuthor_paperId_idx" ON "RepositoryPaperAuthor"("paperId");

-- CreateIndex
CREATE INDEX "RepositoryPaperAuthor_userId_idx" ON "RepositoryPaperAuthor"("userId");

-- CreateIndex
CREATE INDEX "RepositoryPaperAuthor_order_idx" ON "RepositoryPaperAuthor"("order");

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryPaperAuthor_paperId_userId_key" ON "RepositoryPaperAuthor"("paperId", "userId");

-- CreateIndex
CREATE INDEX "PaperVersion_paperId_idx" ON "PaperVersion"("paperId");

-- CreateIndex
CREATE INDEX "PaperVersion_createdAt_idx" ON "PaperVersion"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaperVersion_paperId_version_key" ON "PaperVersion"("paperId", "version");

-- CreateIndex
CREATE INDEX "PaperReview_paperId_idx" ON "PaperReview"("paperId");

-- CreateIndex
CREATE INDEX "PaperReview_userId_idx" ON "PaperReview"("userId");

-- CreateIndex
CREATE INDEX "PaperReview_rating_idx" ON "PaperReview"("rating");

-- CreateIndex
CREATE INDEX "PaperReview_reviewType_idx" ON "PaperReview"("reviewType");

-- CreateIndex
CREATE INDEX "PaperReview_createdAt_idx" ON "PaperReview"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaperCategory_slug_key" ON "PaperCategory"("slug");

-- CreateIndex
CREATE INDEX "PaperBookmark_paperId_idx" ON "PaperBookmark"("paperId");

-- CreateIndex
CREATE INDEX "PaperBookmark_userId_idx" ON "PaperBookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperBookmark_paperId_userId_key" ON "PaperBookmark"("paperId", "userId");

-- CreateIndex
CREATE INDEX "ReviewHelpfulVote_reviewId_idx" ON "ReviewHelpfulVote"("reviewId");

-- CreateIndex
CREATE INDEX "ReviewHelpfulVote_userId_idx" ON "ReviewHelpfulVote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewHelpfulVote_reviewId_userId_key" ON "ReviewHelpfulVote"("reviewId", "userId");

-- CreateIndex
CREATE INDEX "PaperCitation_fromPaperId_idx" ON "PaperCitation"("fromPaperId");

-- CreateIndex
CREATE INDEX "PaperCitation_toPaperId_idx" ON "PaperCitation"("toPaperId");

-- CreateIndex
CREATE INDEX "PaperCitation_toPublicationId_idx" ON "PaperCitation"("toPublicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperCitation_fromPaperId_toPaperId_key" ON "PaperCitation"("fromPaperId", "toPaperId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperCitation_fromPaperId_toPublicationId_key" ON "PaperCitation"("fromPaperId", "toPublicationId");

-- CreateIndex
CREATE INDEX "Job_type_idx" ON "Job"("type");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_field_idx" ON "Job"("field");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Job_workMode_idx" ON "Job"("workMode");

-- CreateIndex
CREATE INDEX "Job_posterId_idx" ON "Job"("posterId");

-- CreateIndex
CREATE INDEX "Job_applicationDeadline_idx" ON "Job"("applicationDeadline");

-- CreateIndex
CREATE INDEX "Job_createdAt_idx" ON "Job"("createdAt");

-- CreateIndex
CREATE INDEX "Job_isFeatured_idx" ON "Job"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "JobCategory_slug_key" ON "JobCategory"("slug");

-- CreateIndex
CREATE INDEX "JobApplication_jobId_idx" ON "JobApplication"("jobId");

-- CreateIndex
CREATE INDEX "JobApplication_userId_idx" ON "JobApplication"("userId");

-- CreateIndex
CREATE INDEX "JobApplication_status_idx" ON "JobApplication"("status");

-- CreateIndex
CREATE INDEX "JobApplication_submittedAt_idx" ON "JobApplication"("submittedAt");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_userId_key" ON "JobApplication"("jobId", "userId");

-- CreateIndex
CREATE INDEX "JobBookmark_jobId_idx" ON "JobBookmark"("jobId");

-- CreateIndex
CREATE INDEX "JobBookmark_userId_idx" ON "JobBookmark"("userId");

-- CreateIndex
CREATE INDEX "JobBookmark_createdAt_idx" ON "JobBookmark"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "JobBookmark_jobId_userId_key" ON "JobBookmark"("jobId", "userId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "Post_type_idx" ON "Post"("type");

-- CreateIndex
CREATE INDEX "Post_visibility_idx" ON "Post"("visibility");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- CreateIndex
CREATE INDEX "Post_isPinned_idx" ON "Post"("isPinned");

-- CreateIndex
CREATE INDEX "Post_deletedAt_idx" ON "Post"("deletedAt");

-- CreateIndex
CREATE INDEX "Post_originalPostId_idx" ON "Post"("originalPostId");

-- CreateIndex
CREATE INDEX "PostReaction_postId_idx" ON "PostReaction"("postId");

-- CreateIndex
CREATE INDEX "PostReaction_userId_idx" ON "PostReaction"("userId");

-- CreateIndex
CREATE INDEX "PostReaction_type_idx" ON "PostReaction"("type");

-- CreateIndex
CREATE UNIQUE INDEX "PostReaction_postId_userId_key" ON "PostReaction"("postId", "userId");

-- CreateIndex
CREATE INDEX "PostComment_postId_idx" ON "PostComment"("postId");

-- CreateIndex
CREATE INDEX "PostComment_userId_idx" ON "PostComment"("userId");

-- CreateIndex
CREATE INDEX "PostComment_parentCommentId_idx" ON "PostComment"("parentCommentId");

-- CreateIndex
CREATE INDEX "PostComment_createdAt_idx" ON "PostComment"("createdAt");

-- CreateIndex
CREATE INDEX "PostComment_deletedAt_idx" ON "PostComment"("deletedAt");

-- CreateIndex
CREATE INDEX "CommentReaction_commentId_idx" ON "CommentReaction"("commentId");

-- CreateIndex
CREATE INDEX "CommentReaction_userId_idx" ON "CommentReaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_commentId_userId_key" ON "CommentReaction"("commentId", "userId");

-- CreateIndex
CREATE INDEX "PostMention_postId_idx" ON "PostMention"("postId");

-- CreateIndex
CREATE INDEX "PostMention_userId_idx" ON "PostMention"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostMention_postId_userId_key" ON "PostMention"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostHashtag_slug_key" ON "PostHashtag"("slug");

-- CreateIndex
CREATE INDEX "PostHashtag_slug_idx" ON "PostHashtag"("slug");

-- CreateIndex
CREATE INDEX "PostHashtag_postCount_idx" ON "PostHashtag"("postCount");

-- CreateIndex
CREATE INDEX "PostHashtag_lastUsedAt_idx" ON "PostHashtag"("lastUsedAt");

-- CreateIndex
CREATE INDEX "PostAttachment_postId_idx" ON "PostAttachment"("postId");

-- CreateIndex
CREATE INDEX "PostAttachment_type_idx" ON "PostAttachment"("type");

-- CreateIndex
CREATE INDEX "PostBookmark_postId_idx" ON "PostBookmark"("postId");

-- CreateIndex
CREATE INDEX "PostBookmark_userId_idx" ON "PostBookmark"("userId");

-- CreateIndex
CREATE INDEX "PostBookmark_createdAt_idx" ON "PostBookmark"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PostBookmark_postId_userId_key" ON "PostBookmark"("postId", "userId");

-- CreateIndex
CREATE INDEX "PostShare_postId_idx" ON "PostShare"("postId");

-- CreateIndex
CREATE INDEX "PostShare_userId_idx" ON "PostShare"("userId");

-- CreateIndex
CREATE INDEX "PostShare_createdAt_idx" ON "PostShare"("createdAt");

-- CreateIndex
CREATE INDEX "Conversation_type_idx" ON "Conversation"("type");

-- CreateIndex
CREATE INDEX "Conversation_updatedAt_idx" ON "Conversation"("updatedAt");

-- CreateIndex
CREATE INDEX "ConversationParticipant_conversationId_idx" ON "ConversationParticipant"("conversationId");

-- CreateIndex
CREATE INDEX "ConversationParticipant_userId_idx" ON "ConversationParticipant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversationId_userId_key" ON "ConversationParticipant"("conversationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_conversationId_key" ON "Channel"("conversationId");

-- CreateIndex
CREATE INDEX "Channel_groupId_idx" ON "Channel"("groupId");

-- CreateIndex
CREATE INDEX "Channel_name_idx" ON "Channel"("name");

-- CreateIndex
CREATE INDEX "Channel_conversationId_idx" ON "Channel"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_groupId_name_key" ON "Channel"("groupId", "name");

-- CreateIndex
CREATE INDEX "ChannelMember_channelId_idx" ON "ChannelMember"("channelId");

-- CreateIndex
CREATE INDEX "ChannelMember_userId_idx" ON "ChannelMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelMember_channelId_userId_key" ON "ChannelMember"("channelId", "userId");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateIndex
CREATE INDEX "_PaperKeywordToRepositoryPaper_B_index" ON "_PaperKeywordToRepositoryPaper"("B");

-- CreateIndex
CREATE INDEX "_JobToJobCategory_B_index" ON "_JobToJobCategory"("B");

-- CreateIndex
CREATE INDEX "_PostToPostHashtag_B_index" ON "_PostToPostHashtag"("B");

-- AddForeignKey
ALTER TABLE "RepositoryPaper" ADD CONSTRAINT "RepositoryPaper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PaperCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryPaper" ADD CONSTRAINT "RepositoryPaper_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryPaperAuthor" ADD CONSTRAINT "RepositoryPaperAuthor_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryPaperAuthor" ADD CONSTRAINT "RepositoryPaperAuthor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperVersion" ADD CONSTRAINT "PaperVersion_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperReview" ADD CONSTRAINT "PaperReview_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperReview" ADD CONSTRAINT "PaperReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperBookmark" ADD CONSTRAINT "PaperBookmark_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperBookmark" ADD CONSTRAINT "PaperBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewHelpfulVote" ADD CONSTRAINT "ReviewHelpfulVote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "PaperReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewHelpfulVote" ADD CONSTRAINT "ReviewHelpfulVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperCitation" ADD CONSTRAINT "PaperCitation_fromPaperId_fkey" FOREIGN KEY ("fromPaperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperCitation" ADD CONSTRAINT "PaperCitation_toPaperId_fkey" FOREIGN KEY ("toPaperId") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperCitation" ADD CONSTRAINT "PaperCitation_toPublicationId_fkey" FOREIGN KEY ("toPublicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobBookmark" ADD CONSTRAINT "JobBookmark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobBookmark" ADD CONSTRAINT "JobBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sharedPublicationId_fkey" FOREIGN KEY ("sharedPublicationId") REFERENCES "Publication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sharedEventId_fkey" FOREIGN KEY ("sharedEventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sharedJobId_fkey" FOREIGN KEY ("sharedJobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sharedPaperId_fkey" FOREIGN KEY ("sharedPaperId") REFERENCES "RepositoryPaper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originalPostId_fkey" FOREIGN KEY ("originalPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMention" ADD CONSTRAINT "PostMention_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMention" ADD CONSTRAINT "PostMention_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostAttachment" ADD CONSTRAINT "PostAttachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBookmark" ADD CONSTRAINT "PostBookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBookmark" ADD CONSTRAINT "PostBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostShare" ADD CONSTRAINT "PostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostShare" ADD CONSTRAINT "PostShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaperKeywordToRepositoryPaper" ADD CONSTRAINT "_PaperKeywordToRepositoryPaper_A_fkey" FOREIGN KEY ("A") REFERENCES "PaperKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaperKeywordToRepositoryPaper" ADD CONSTRAINT "_PaperKeywordToRepositoryPaper_B_fkey" FOREIGN KEY ("B") REFERENCES "RepositoryPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToJobCategory" ADD CONSTRAINT "_JobToJobCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToJobCategory" ADD CONSTRAINT "_JobToJobCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "JobCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPostHashtag" ADD CONSTRAINT "_PostToPostHashtag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToPostHashtag" ADD CONSTRAINT "_PostToPostHashtag_B_fkey" FOREIGN KEY ("B") REFERENCES "PostHashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
